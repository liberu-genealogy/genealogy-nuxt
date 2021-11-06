/**
 * See LICENSE.md file for further details.
 */

import * as d3 from "./d3";
import dataUrl from "./common/dataUrl";
import {SEX_FEMALE, SEX_MALE} from "./constants";

/**
 * The class handles the creation of the tree.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
 */
export default class Tree
{
    /**
     * Constructor.
     *
     * @param {Svg}           svg
     * @param {Configuration} configuration The configuration
     * @param {Hierarchy}     hierarchy     The hierarchiecal data
     */
    constructor(svg, configuration, hierarchy)
    {
        this._svg           = svg;
        this._configuration = configuration;
        this._hierarchy     = hierarchy;

        this._hierarchy.root.x0 = 0;
        this._hierarchy.root.y0 = 0;

        this._orientation = this._configuration.orientation;

        this.draw(this._hierarchy.root);
    }

    /**
     * Draw the tree.
     *
     * @public
     */
    draw(source)
    {
        let nodes = this._hierarchy.nodes.descendants();
        let links = this._hierarchy.nodes.links();

        // // Start with only the first few generations of ancestors showing
        // nodes.forEach((person) => {
        //     if (person.parents) {
        //         person.parents.forEach((child) => this.collapse(child));
        //     }
        // });

        // Normalize for fixed-depth.
        nodes.forEach((person) => {
            this._orientation.norm(person);
        });

        this.drawLinks(links, source);
        this.drawNodes(nodes, source);

        // Stash the old positions for transition.
        nodes.forEach((person) => {
            person.x0 = person.x;
            person.y0 = person.y;
        });
    }

    // /**
    //  * Draw the tree.
    //  *
    //  * @public
    //  */
    // update(source)
    // {
    //     let nodes = this._hierarchy.nodes.descendants();
    //     let links = this._hierarchy.nodes.links();
    //
    //     // // Start with only the first few generations of ancestors showing
    //     // nodes.forEach((person) => {
    //     //     if (person.parents) {
    //     //         person.parents.forEach((child) => this.collapse(child));
    //     //     }
    //     // });
    //
    //     this.drawLinks(links, source);
    //     this.drawNodes(nodes, source);
    //
    //     // Stash the old positions for transition.
    //     nodes.forEach((person) => {
    //         person.x0 = person.x;
    //         person.y0 = person.y;
    //     });
    // }

    /**
     * Draw the person boxes.
     *
     * @param {Array} nodes Array of descendant nodes
     *
     * @private
     */
    drawNodes(nodes, source)
    {
        let i = 0;
        let that = this;

        let clipPath = this._svg
            .defs
            .get()
            .append('clipPath')
            .attr('id', 'clip-rect')
            .append("rect")
            .attr("rx", that._orientation.imageCornerRadius())
            .attr("ry", that._orientation.imageCornerRadius())
            .attr("x", that._orientation.imageX())
            .attr("y", that._orientation.imageY())
            .attr("width", that._orientation.imageWidth())
            .attr("height", that._orientation.imageHeight());

        let t = this._svg.visual
            .transition()
            .duration(this._configuration.duration);

        let node = this._svg.visual
            .selectAll("g.person")
            .data(nodes, person => person.id || (person.id = ++i));

        let nodeEnter = node
            .enter()
            .append("g")
            .attr("class", "person")
            // Add new nodes at the right side of their child's box.
            // They will be transitioned into their proper position.
            // .attr("transform", person => {
            //     return "translate(" + (this._configuration.direction * (source.y0 + (this._orientation.boxWidth / 2))) + ',' + source.x0 + ")";
            // })
            // .attr("transform", person => {
            //     return "translate(" + (this._configuration.direction * (source.y + (this._orientation.boxWidth / 2))) + ',' + source.x + ")";
            // })
            // .attr("transform", person => `translate(${source.y0}, ${source.x0})`)
            .attr("transform", person => {
                return "translate(" + this._orientation.x(person) + "," + this._orientation.y(person) + ")";
            })
        ;

        // Draw the rectangle person boxes. Start new boxes with 0 size so that we can
        // transition them to their proper size.
        nodeEnter
            .append("rect")
            .attr("class", d => (d.data.sex === SEX_FEMALE) ? "female" : (d.data.sex === SEX_MALE) ? "male" : "unknown")
            .attr("rx", this._orientation.cornerRadius())
            .attr("ry", this._orientation.cornerRadius())
            .attr("x", -(this._orientation.boxWidth / 2))
            .attr("y", -(this._orientation.boxHeight / 2))
            .attr("width", this._orientation.boxWidth)
            .attr("height", this._orientation.boxHeight)
            .attr("fill-opacity", 0.5)
            .attr("fill", d => d.data.color);

        // Names and Dates
        nodeEnter
            .filter(d => (d.data.xref !== ""))
            .each(function (d) {
                let element = d3.select(this);

                element
                    .append("title")
                    .text(d => d.data.name);

                let group = element
                    .append("g")
                    .attr("class", "image");

                // Background (only required if thumbnail has transparency (like the silhouettes))
                group
                    .append("rect")
                    .attr("rx", that._orientation.imageCornerRadius())
                    .attr("ry", that._orientation.imageCornerRadius())
                    .attr("x", that._orientation.imageX())
                    .attr("y", that._orientation.imageY())
                    .attr("width", that._orientation.imageWidth())
                    .attr("height", that._orientation.imageHeight())
                    .attr("fill", "rgb(255, 255, 255)");

                // The individual image
                let image = group
                    .append("image")
                    .attr("x", that._orientation.imageX())
                    .attr("y", that._orientation.imageY())
                    .attr("width", that._orientation.imageWidth())
                    .attr("height", that._orientation.imageHeight())
                    .attr("clip-path", "url(#clip-rect)");

                dataUrl(that.getImageToLoad(d))
                    .then(dataUrl => image.attr("xlink:href", dataUrl))
                    .catch((exception) => {
                        console.error(exception);
                    });

                // Border
                group
                    .append("rect")
                    .attr("rx", that._orientation.imageCornerRadius())
                    .attr("ry", that._orientation.imageCornerRadius())
                    .attr("x", that._orientation.imageX())
                    .attr("y", that._orientation.imageY())
                    .attr("width", that._orientation.imageWidth())
                    .attr("height", that._orientation.imageHeight())
                    .attr("fill", "none")
                    .attr("stroke", "rgb(200, 200, 200)")
                    .attr("stroke-width", 1.5);

                that.addNames(element, d);
                that.addDates(element, d);
            });

    //     // Merge the update and the enter selections
    //     let nodeUpdate = nodeEnter.merge(node);
    //
    //     nodeUpdate
    //         .transition()
    //         .duration(this._configuration.duration)
    //         // .attr("transform", person => `translate(${person.y}, ${person.x})`);
    //         .attr("transform", person => {
    //             return "translate(" + (this._configuration.direction * person.y) + "," + person.x + ")";
    //         });
    //
    //     // Grow boxes to their proper size
    //     nodeUpdate.select('rect')
    //         .attr("x", -(this._orientation.boxWidth / 2))
    //         .attr("y", -(this._orientation.boxHeight / 2))
    //         .attr("width", this._orientation.boxWidth)
    //         .attr("height", this._orientation.boxHeight)
    //         // .attr("fill-opacity", "0.5")
    //         // .attr({
    //         //     x: -(this._orientation.boxWidth / 2),
    //         //     y: -(this._orientation.boxHeight / 2),
    //         //     width: this._orientation.boxWidth,
    //         //     height: this._orientation.boxHeight
    //         // })
    // ;
    //
    //     // Move text to it's proper position
    //     // nodeUpdate.select('text')
    //     //     .attr("dx", -(this._orientation.boxWidth / 2) + 10)
    //     //     .style("fill-opacity", 1);
    //
    //     // Remove nodes we aren't showing anymore
    //     let nodeExit = node
    //         .exit()
    //         .transition()
    //         .duration(this._configuration.duration)
    //         // Transition exit nodes to the source's position
    //         .attr("transform", person => {
    //             return "translate(" + (this._configuration.direction * (source.y + (this._orientation.boxWidth / 2))) + ',' + source.x + ")";
    //         })
    //         // .attr("transform", person => `translate(${source.y}, ${source.x})`)
    //         // .attr("transform", (d) => {
    //         //     return "translate(" + source.y + "," + source.x + ")";
    //         // })
    //         .remove();
    //
    //     // Shrink boxes as we remove them
    //     nodeExit.select('rect')
    //         .attr("x", 0)
    //         .attr("y", 0)
    //         .attr("width", 0)
    //         .attr("height", 0)
    //         // .attr("fill-opacity", 0)
    //         // .attr({
    //         //     x: 0,
    //         //     y: 0,
    //         //     width: 0,
    //         //     height: 0
    //         // })
    //     ;

        // Fade out the text as we remove it
        // nodeExit.select('text')
        //     .style('fill-opacity', 0)
        //     .attr('dx', 0);


        // nodeEnter
        //     .filter(d => (d.data.xref !== ""))
        //     .append("title")
        //     .text(d => d.data.name);

        // this.addImages(nodeEnter);

        // // Names and Dates
        // nodeEnter
        //     .filter(d => (d.data.xref !== ""))
        //     .each(function (d) {
        //         let parent = d3.select(this);
        //
        //         // Names
        //         let text1 = parent
        //             .append("text")
        //             .attr("dx", -(that.boxWidth / 2) + 80)
        //             .attr("dy", "-12px")
        //             .attr("text-anchor", "start")
        //             .attr("class", "name");
        //
        //         that.addNames(text1, d);
        //
        //         // Time span
        //         let text2 = parent
        //             .append("text")
        //             .attr("dx", -(that.boxWidth / 2) + 80)
        //             .attr("dy", "10px")
        //             .attr("text-anchor", "start")
        //             .attr("class", "date");
        //
        //         that.addTimeSpan(text2, d);
        //     });


        // node.join(
        //     enter => {
        //         let nodeEnter = enter
        //             .append("g")
        //             .attr("class", "person")
        //             // .attr("transform", person => `translate(${person.y}, ${person.x})`)
        //             .attr("transform", person => {
        //                 return "translate(" + (this._configuration.direction * (source.y0 + (this._orientation.boxWidth / 2))) + ',' + source.x0 + ")";
        //             })
        //             .on("click", this.togglePerson.bind(this));
        //
        //         nodeEnter
        //             .append("rect")
        //             // .attr("x", -(this._orientation.boxWidth / 2))
        //             // .attr("y", -(this._orientation.boxHeight / 2))
        //             // .attr("width", this._orientation.boxWidth)
        //             // .attr("height", this._orientation.boxHeight);
        //             .attr("x", 0)
        //             .attr("y", 0)
        //             .attr("width", 0)
        //             .attr("height", 0);
        //
        //         return nodeEnter;
        //     },
        //
        //     update => {
        //         let nodeUpdate = update
        //             .call(update => update
        //                 .transition(t)
        //                 .attr("transform", person => {
        //                     return "translate(" + (this._configuration.direction * person.y) + "," + person.x + ")";
        //                 })
        //             );
        //
        //         nodeUpdate
        //             .select('rect')
        //             .attr("x", -(this._orientation.boxWidth / 2))
        //             .attr("y", -(this._orientation.boxHeight / 2))
        //             .attr("width", this._orientation.boxWidth)
        //             .attr("height", this._orientation.boxHeight);
        //
        //         return nodeUpdate;
        //     },
        //
        //     exit => {
        //         let nodeExit = exit
        //             .call(exit => exit
        //                 .transition(t)
        //                 .attr("transform", person => {
        //                     return "translate(" + (this._configuration.direction * (source.y + (this._orientation.boxWidth / 2))) + ',' + source.x + ")";
        //                 })
        //             )
        //             .remove();
        //
        //         nodeExit
        //             .select('rect')
        //             .attr("x", 0)
        //             .attr("y", 0)
        //             .attr("width", 0)
        //             .attr("height", 0);
        //
        //         return nodeExit;
        //     }
        // )
        //     // .selectAll('rect')
        //     // .attr("x", -(this._orientation.boxWidth / 2))
        //     // .attr("y", -(this._orientation.boxHeight / 2))
        //     // .attr("width", this._orientation.boxWidth)
        //     // .attr("height", this._orientation.boxHeight);
        // ;
        //
        // return;

    }

    /**
     * Update a person's state when they are clicked.
     */
    togglePerson(event, person)
    {
        if (person.parents) {
            person._parents = person.parents;
            person.parents = null;
        } else {
            person.parents = person._parents;
            person._parents = null;
        }

        this.draw(person);

        // if (person.collapsed) {
        //     person.collapsed = false;
        // } else {
        //     this.collapse(person);
        // }
        //
        // this.draw(person);
    }

    /**
     * Collapse person (hide their ancestors). We recursively
     * collapse the ancestors so that when the person is
     * expanded it will only reveal one generation. If we don't
     * recursively collapse the ancestors then when
     * the person is clicked on again to expand, all ancestors
     * that were previously showing will be shown again.
     * If you want that behavior then just remove the recursion
     * by removing the if block.
     */
    collapse(person)
    {
        if (person.parents) {
            person._parents = person.parents;
            person._parents.forEach((child) => this.collapse(child));
            // person._parents.forEach(this.collapse);
            person.parents = null;
        }

        // person.collapsed = true;
        //
        // if (person.parents) {
        //     person.parents.forEach((child) => this.collapse(child));
        //     person.parents.forEach(this.collapse);
        // }
    }

    /**
     * Creates a single <tspan> element for each single given name and append it to the
     * parent element. The "tspan" element containing the preferred name gets an
     * additional underline style in order to highlight this one.
     *
     * @param {Selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
     * @param {Object}    datum  The D3 data object containing the individual data
     */
    addFirstNames(parent, datum)
    {
        let i = 0;

        for (let firstName of datum.data.firstNames) {
            // Create a <tspan> element for each given name
            let tspan = parent.append("tspan")
                .text(firstName);

            // The preferred name
            if (firstName === datum.data.preferredName) {
                tspan.attr("class", "preferred");
            }

            // Add some spacing between the elements
            if (i !== 0) {
                tspan.attr("dx", "0.25em");
            }

            ++i;
        }
    }

    /**
     * Creates a single <tspan> element for each last name and append it to the parent element.
     *
     * @param {Selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
     * @param {Object}    datum  The D3 data object containing the individual data
     * @param {Number}    dx     Additional space offset to add between names
     */
    addLastNames(parent, datum, dx = 0)
    {
        let i = 0;

        for (let lastName of datum.data.lastNames) {
            // Create a <tspan> element for the last name
            let tspan = parent.append("tspan")
                .attr("class", "lastName")
                .text(lastName);

            // Add some spacing between the elements
            if (i !== 0) {
                tspan.attr("dx", "0.25em");
            }

            if (dx !== 0) {
                tspan.attr("dx", dx + "em");
            }

            ++i;
        }
    }

    /**
     * Loops over the <tspan> elements and truncates the contained texts.
     *
     * @param {Selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are attached
     * @param {Boolean}   hide   Whether to show or hide the label if the text takes to much space to be displayed
     */
    truncateNames(parent, hide = false)
    {
        let availableWidth = this._orientation.textWidth();

        // Select all not preferred and not last names
        this.truncateListOfNames(
            parent.selectAll("tspan:not(.preferred):not(.lastName)"),
            parent,
            availableWidth,
            hide
        );

        // Afterwards the preferred ones if text takes still to much space
        parent.selectAll("tspan.preferred")
            .each(this.truncateText(parent, availableWidth, hide));

        // Truncate lastnames
        parent.selectAll("tspan.lastName")
            .each(this.truncateText(parent, availableWidth, hide));
    }

    /**
     *
     * @param {Selection} names          A selection of name elements
     * @param {Selection} parent         The parent (<text> or <textPath>) element to which the <tspan> elements are attached
     * @param {Number}    availableWidth The total available width the text could take
     * @param {Boolean}   hide           Whether to show or hide the label if the text takes to much space to be displayed
     */
    truncateListOfNames(names, parent, availableWidth, hide)
    {
        if (names.size()) {
            // Start truncating from last element to the first one
            names.nodes()
                .reverse()
                .forEach(element => {
                    d3.select(element)
                        .each(this.truncateText(parent, availableWidth, hide));
                });
        }
    }

    /**
     * Truncates the textual content of the actual element.
     *
     * @param {Selection} parent         The parent (<text> or <textPath>) element containing the <tspan> child elements
     * @param {Number}    availableWidth The total available width the text could take
     * @param {Boolean}   hide           Whether to show or hide the label if the text takes to much space to be displayed
     */
    truncateText(parent, availableWidth, hide = false)
    {
        let that = this;

        return function () {
            let textLength = that.getTextLength(parent);
            let tspan      = d3.select(this);
            let text       = tspan.text();

            if (textLength > availableWidth) {
                if (hide) {
                    tspan.text("");
                } else {
                    if (text.length > 1) {
                        // Keep only the first letter
                        tspan.text(text.slice(0, 1) + ".");
                    }
                }
            }
        };
    }

    /**
     * Returns a float representing the computed length of all <tspan> elements within the element.
     *
     * @param {Selection} parent The parent (<text> or <textPath>) element containing the <tspan> child elements
     *
     * @returns {Number}
     */
    getTextLength(parent)
    {
        let totalWidth = 0;

        // Calculate the total used width of all <tspan> elements
        parent.selectAll("tspan").each(function () {
            totalWidth += this.getComputedTextLength();
        });

        return totalWidth;
    }

    /**
     * Add the individual names to the given parent element.
     *
     * @param {Selection} parent The parent element to which the elements are to be attached
     * @param {Object}    datum  The D3 data object
     */
    addNames(parent, datum)
    {
        let name = parent
            .append("g")
            .attr("class", "name");

        // Top/Bottom and Bottom/Top
        if (this._orientation._splittNames) {
            let text1 = name.append("text")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .attr("dy", this._orientation.textY());

            let text2 = name.append("text")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .attr("dy", this._orientation.textY() + 20);

            this.addFirstNames(text1, datum);
            this.addLastNames(text2, datum);

            this.truncateNames(text1);
            this.truncateNames(text2);

        // Left/Right and Right/Left
        } else {
            let text1 = name.append("text")
                .attr("text-anchor", "start")
                .attr("dx", this._orientation.textX())
                .attr("dy", this._orientation.textY());

            this.addFirstNames(text1, datum);
            this.addLastNames(text1, datum, 0.25);
            this.truncateNames(text1);
        }
    }

    /**
     * Add the individual dates to the given parent element.
     *
     * @param {Selection} parent The parent element to which the elements are to be attached
     * @param {Object}    datum  The D3 data object
     */
    addDates(parent, datum)
    {
        let table = parent
            .append("g")
            .attr("class", "table");

        // Top/Bottom and Bottom/Top
        if (this._orientation._splittNames) {
            let text1 = table.append("text")
                .attr("class", "date")
                .attr("text-anchor", "middle")
                .attr("alignment-baseline", "central")
                .attr("dy", this._orientation.textY() + 50);

            text1.append("tspan")
                .text(datum.data.timespan);

            return;
        }

        // A text element for the asterix and dagger
        let col1 = table
            .append("text")
            .attr("class", "date")
            .attr("text-anchor", "middle")
            .attr("dominant-baseline", "middle")
            .attr("x", this._orientation.textX())
            .attr("y", this._orientation.textY() + 15);

        // The asterix
        if (datum.data.birth) {
            col1.append("tspan")
                .text("\u2605")
                .attr("x", this._orientation.textX() + 5)
                .attr("dy", this._orientation.textY() + 20);
        }

        // The dagger
        if (datum.data.death) {
            let death = col1
                .append("tspan")
                .text("\u2020");

            // Are both dates present?
            if (datum.data.birth) {
                death.attr("x", this._orientation.textX() + 5)
                    .attr("dy", this._orientation.textY() + 35);
            } else {
                // Only death date
                death.attr("x", this._orientation.textX() + 5)
                    .attr("dy", this._orientation.textY() + 20);
            }
        }

        // A text element for the dates
        let col2 = table.append("text")
            .attr("class", "date")
            .attr("text-anchor", "start")
            .attr("dominant-baseline", "middle")
            .attr("x", this._orientation.textX())
            .attr("y", this._orientation.textY() + 20);

        if (datum.data.birth) {
            col2.append("tspan")
                .text(datum.data.birth)
                .attr("x", this._orientation.textX() + 15)
                .attr("dy", this._orientation.textY() + 15);
        }

        if (datum.data.death) {
            let death = col2.append("tspan")
                .text(datum.data.death);

            if (datum.data.birth) {
                death.attr("x", this._orientation.textX() + 15)
                    .attr("dy", this._orientation.textY() + 35);
            } else {
                death.attr("x", this._orientation.textX() + 15)
                    .attr("dy", this._orientation.textY() + 15);
            }
        }
    }

    /**
     * Return the image file or the placeholder.
     *
     * @param {Object} data The D3 data object
     *
     * @returns {String}
     */
    getImageToLoad(datum)
    {
        if (datum.data.thumbnail) {
            return datum.data.thumbnail;
        }

        return "";
    }

    /**
     * Draw the connecting lines.
     *
     * @param {Array} links Array of links
     *
     * @private
     */
    drawLinks(links, source)
    {
        let that = this;

        let link = this._svg.visual
            .selectAll("path.link")
            .data(links, person => person.target.id);

        // Add new links. Transition new links from the source's old position to
        // the links final position.
        let linkEnter = link
            .enter()
            .append("path")
            .classed("link", true)
            .attr("d", person => this._orientation.elbow(person));

        // // Add new links. Transition new links from the source's old position to
        // // the links final position.
        // let linkEnter = link.enter()
        //     .append("path")
        //     .classed("link", true)
        //     .attr("d", person => {
        //         const o = {
        //             x: source.x0,
        //             y: this._configuration.direction * (source.y0 + (this._orientation.boxWidth / 2))
        //         };
        //
        //         return this.transitionElbow({ source: o, target: o });
        //     });
        //
        // var linkUpdate = linkEnter.merge(link);
        //
        // // Update the old links positions
        // linkUpdate.transition()
        //     .duration(this._configuration.duration)
        //     .attr("d", person => this.elbow(person));
        //
        // // Remove any links we don't need anymore if part of the tree was collapsed. Transition exit
        // // links from their current position to the source's new position.
        // link.exit()
        //     .transition()
        //     .duration(this._configuration.duration)
        //     .attr("d", person => {
        //         const o = {
        //             x: source.x,
        //             y: this._configuration.direction * (source.y + this._orientation.boxWidth / 2)
        //         };
        //
        //         return this.transitionElbow({ source: o, target: o });
        //     })
        //     .remove();
    }

    // /**
    //  * Use a different elbow function for enter
    //  * and exit nodes. This is necessary because
    //  * the function above assumes that the nodes
    //  * are stationary along the x axis.
    //  *
    //  * @param {Object} datum D3 data object
    //  *
    //  * @private
    //  */
    // transitionElbow(datum)
    // {
    //     return "M" + datum.source.y + "," + datum.source.x
    //         + "H" + datum.source.y
    //         + "V" + datum.source.x
    //         + "H" + datum.source.y;
    // }
}
