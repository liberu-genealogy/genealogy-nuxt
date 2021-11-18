/**
 * See LICENSE.md file for further details.
 */

import * as d3 from "./../../d3";
import Svg from "./../svg"
import Geometry, {MATH_DEG2RAD, MATH_RAD2DEG} from "./geometry";

/**
 * The class handles all the text and path elements.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-fan-chart/
 */
export default class Text
{
    /**
     * Constructor.
     *
     * @param {Svg}           svg
     * @param {Configuration} configuration The application configuration
     */
    constructor(svg, configuration)
    {
        this._svg           = svg;
        this._configuration = configuration;
        this._geometry      = new Geometry(this._configuration);
    }

    /**
     * Creates all the labels and all dependent elements for a single person.
     *
     * @param {selection} parent The parent element to which the elements are to be attached
     * @param {Object}    data   The D3 data object
     */
    createLabels(parent, data)
    {
        // Inner labels
        if (this.isInnerLabel(data)) {
            let text     = this.createTextElement(parent, data);
            let parentId = d3.select(parent.node().parentNode).attr("id");

            // First names
            let pathId1   = this.createPathDefinition(parentId, 0, data);
            let textPath1 = this.createTextPath(text, pathId1);
            this.addFirstNames(textPath1, data);
            this.truncateNames(textPath1, data, 0);

            // Last names
            let pathId2   = this.createPathDefinition(parentId, 1, data);
            let textPath2 = this.createTextPath(text, pathId2);
            this.addLastNames(textPath2, data);
            this.truncateNames(textPath2, data, 1);

            // Alternative names
            if (data.data.alternativeNames.length > 0) {
                let pathId3   = this.createPathDefinition(parentId, 2, data);
                let textPath3 = this.createTextPath(text, pathId3)
                    .attr("class", "alternativeName")
                    .classed("rtl", data.data.isAltRtl);

                this.addAlternativeNames(textPath3, data);
                this.truncateNames(textPath3, data, 2);
            }

            // Birth and death date
            let pathId4   = this.createPathDefinition(parentId, 3, data);
            let textPath4 = this.createTextPath(text, pathId4)
                .attr("class", "date");

            this.addTimeSpan(textPath4, data);

        // Outer labels
        } else {
            // The outer most circles show the complete name and do
            // not distinguish between first name, last name and dates
            if (data.depth >= 7) {
                let text1 = this.createTextElement(parent, data)
                    .attr("dy", "2px");

                this.addFirstNames(text1, data);
                this.addLastNames(text1, data, 0.25);
                this.truncateNames(text1, data, 0);
            }

            if (data.depth < 7) {
                // First names
                let text2 = this.createTextElement(parent, data)
                    .attr("dy", "2px");

                this.addFirstNames(text2, data);
                this.truncateNames(text2, data, 0);

                // Last names
                let text3 = this.createTextElement(parent, data)
                    .attr("dy", "2px");

                this.addLastNames(text3, data);
                this.truncateNames(text3, data, 1);

                // Birth and death date
                if (data.depth < 6) {
                    // Birth and death date
                    let text4 = this.createTextElement(parent, data)
                        .attr("class", "date")
                        .attr("dy", "2px");

                    this.addTimeSpan(text4, data);
                }
            }

            // Rotate outer labels in right position
            this.transformOuterText(parent, data);
        }

        // Marriage date
        if (this._configuration.showParentMarriageDates && data.children && (data.depth < 5)) {
            let text5     = this.createTextElement(parent, data);
            let parentId5 = d3.select(parent.node().parentNode).attr("id");
            let pathId5   = this.createPathDefinition(parentId5, 4, data);
            let textPath5 = this.createTextPath(text5, pathId5)
                .attr("class", "marriage-date");

            this.addMarriageDate(textPath5, data);
        }
    }

    /**
     * Creates a single <tspan> element for each single given name and append it to the
     * parent element. The "tspan" element containing the preferred name gets an
     * additional underline style in order to highlight this one.
     *
     * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
     * @param {Object}    data   The D3 data object containing the individual data
     */
    addFirstNames(parent, data)
    {
        let i = 0;

        for (let firstName of data.data.firstNames) {
            // Create a <tspan> element for each given name
            let tspan = parent.append("tspan")
                .text(firstName);

            // The preferred name
            if (firstName === data.data.preferredName) {
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
     * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
     * @param {Object}    data   The D3 data object containing the individual data
     * @param {Number}    dx     Additional space offset to add between names
     */
    addLastNames(parent, data, dx = 0)
    {
        let i = 0;

        for (let lastName of data.data.lastNames) {
            // Create a <tspan> element for each last name
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
     * Creates a single <tspan> element for each alternative name and append it to the parent element.
     *
     * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
     * @param {Object}    data   The D3 data object containing the individual data
     * @param {Number}    dx     Delta X offset used to create a small spacing between multiple words
     */
    addAlternativeNames(parent, data, dx = 0)
    {
        let i = 0;

        for (let alternativeName of data.data.alternativeNames) {
            // Create a <tspan> element for each alternative name
            let tspan = parent.append("tspan")
                .text(alternativeName);

            // Add some spacing between the elements
            if (i !== 0) {
                tspan.attr("dx", (data.data.isAltRtl ? -0.25 : 0.25) + "em");
            }

            ++i;
        }
    }

    /**
     * Creates a single <tspan> element for the time span append it to the parent element.
     *
     * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
     * @param {Object}    data   The D3 data object containing the individual data
     */
    addTimeSpan(parent, data)
    {
        // Create a <tspan> element for the time span
        parent.append("tspan")
            .text(data.data.timespan);
    }

    /**
     * Creates a single <tspan> element for the marriage date and append it to the parent element.
     *
     * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are to be attached
     * @param {Object}    data   The D3 data object containing the individual data
     */
    addMarriageDate(parent, data)
    {
        // Create a <tspan> element for the parent marriage date
        if (data.data.parentMarriage) {
            parent.append("tspan")
                .text("\u26AD " + data.data.parentMarriage);
        }
    }

    /**
     * Loops over the <tspan> elements and truncates the contained texts.
     *
     * @param {selection} parent The parent (<text> or <textPath>) element to which the <tspan> elements are attached
     * @param {Object}    data   The D3 data object containing the individual data
     * @param {Number}    index  The index position of the element in parent container.
     * @param {Boolean}   hide   Whether to show or hide the label if the text takes to much space to be displayed
     */
    truncateNames(parent, data, index, hide = false)
    {
        let availableWidth = this.getAvailableWidth(data, index);

        // Select all not preferred names and not last names
        let names = parent.selectAll("tspan:not(.preferred):not(.lastName)");

        if (names.size()) {
            // Start truncating from last element to the first one
            names.nodes()
                .reverse()
                .forEach(element => {
                    d3.select(element)
                        .each(this.truncateText(parent, availableWidth, hide));
                });
        }

        // Afterwards the preferred ones if text takes still to much space
        parent.selectAll("tspan.preferred")
            .each(this.truncateText(parent, availableWidth, hide));

        // Truncate last names as last ones
        parent.selectAll("tspan.lastName")
            .each(this.truncateText(parent, availableWidth, hide));
    }

    /**
     * Returns a float representing the computed length of all <tspan> elements within the element.
     *
     * @param {selection} parent The parent (<text> or <textPath>) element containing the <tspan> child elements
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
     * Truncates the textual content of the actual element.
     *
     * @param {selection} parent         The parent (<text> or <textPath>) element containing the <tspan> child elements
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

        // Truncate text letter by letter

        // while ((textLength > availableWidth) && (text.length > 1)) {
        //     // Remove last char
        //     text = text.slice(0, -1);
        //
        //     if (text.length > 1) {
        //         self.text(text + "...");
        //     } else {
        //         self.text(text + ".");
        //     }
        //
        //     // Recalculate the text width
        //     textLength = this.getTextLength(parent);
        // }
    }

    /**
     * Returns TRUE if the depth of the element is in the inner range. So labels should
     * be rendered along an arc path. Otherwise returns FALSE to indicate the element
     * is either the center one or an outer arc.
     *
     * @param {Object} data The D3 data object
     *
     * @return {Boolean}
     */
    isInnerLabel(data)
    {
        // Note: The center element does not belong to the inner labels!
        return ((data.depth > 0) && (data.depth <= this._configuration.numberOfInnerCircles));
    }

    /**
     * Creates a <text> element and append it to the parent element.
     *
     * @param {selection} parent The parent element to which the <text> element is to be attached
     * @param {Object}    data   The D3 data object
     *
     * @return {selection} Newly created <text> element
     */
    createTextElement(parent, data)
    {
        return parent.append("text");
    }

    /**
     * Creates a <textPath> element and append it to the parent element.
     *
     * @param {selection} parent The parent element to which the <textPath> element is to be attached
     * @param {String}    refId  The id of the reference element
     *
     * @return {selection} Newly created <textPath> element
     */
    createTextPath(parent, refId)
    {
        return parent
            .append("textPath")
            .attr("xlink:href", "#" + refId)
            .attr("startOffset", "25%");
    }

    /**
     * Creates a new <path> definition and append it to the global definition list.
     *
     * @param {String} parentId The parent element id
     * @param {Number} index    Index position of element in parent container. Required to create a unique path id.
     * @param {Object} data     The D3 data object
     *
     * @return {String} The id of the newly created path element
     */
    createPathDefinition(parentId, index, data)
    {
        let pathId = "path-" + parentId + "-" + index;

        // If definition already exists return the existing path id
        if (this._svg.defs.get().select("path#" + pathId).node()) {
            return pathId;
        }

        let positionFlipped = this.isPositionFlipped(data.depth, data.x0, data.x1);
        let startAngle      = this._geometry.startAngle(data.depth, data.x0);
        let endAngle        = this._geometry.endAngle(data.depth, data.x1);
        let relativeRadius  = this._geometry.relativeRadius(data.depth, this.getTextOffset(positionFlipped, index));

        // Special treatment for center marriage date position
        if (this._configuration.showParentMarriageDates && (index === 4) && (data.depth < 1)) {
            startAngle = this._geometry.calcAngle(data.x0);
            endAngle   = this._geometry.calcAngle(data.x1);
        }

        // Create an arc generator for path segments
        let arcGenerator = d3.arc()
            .startAngle(positionFlipped ? endAngle : startAngle)
            .endAngle(positionFlipped ? startAngle : endAngle)
            .innerRadius(relativeRadius)
            .outerRadius(relativeRadius);

        arcGenerator
            .padAngle(this._configuration.padAngle)
            .padRadius(this._configuration.padRadius)
            .cornerRadius(this._configuration.cornerRadius);

        // Store the <path> inside the definition list so we could
        // access it later on by its id
        this._svg.defs.get()
            .append("path")
            .attr("id", pathId)
            .attr("d", arcGenerator);

        return pathId;
    }

    /**
     * Check for the 360 degree chart if the current arc labels should be flipped for easier reading.
     *
     * @param {Number} depth The depth of the element inside the chart
     * @param {Number} x0    The left edge (x0) of the rectangle
     * @param {Number} x1    The right edge (x1) of the rectangle
     *
     * @return {Boolean}
     */
    isPositionFlipped(depth, x0, x1)
    {
        if ((this._configuration.fanDegree !== 360) || (depth <= 1)) {
            return false;
        }

        const startAngle = this._geometry.startAngle(depth, x0);
        const endAngle   = this._geometry.endAngle(depth, x1);

        // Flip names for better readability depending on position in chart
        return ((startAngle >= (90 * MATH_DEG2RAD)) && (endAngle <= (180 * MATH_DEG2RAD)))
            || ((startAngle >= (-180 * MATH_DEG2RAD)) && (endAngle <= (-90 * MATH_DEG2RAD)));
    }

    /**
     * Get the relative position offsets in percent for different text lines (firstName, lastName, dates).
     *   => (0 = inner radius, 100 = outer radius)
     *
     * @param {Boolean} positionFlipped TRUE if the labels should be flipped for easier reading
     * @param {Number}  index           The index position of element in parent container. Required to create a unique path id.
     *
     * @return {Number}
     */
    getTextOffset(positionFlipped, index)
    {
        // First names, Last name, Alternate name, Date, Parent marriage date
        return positionFlipped
            ? [23, 42, 61, 84, 125][index]
            : [73, 54, 35, 12, 120][index];
    }

    /**
     * Calculate the available text width. Depending on the depth of an entry in
     * the chart the available width differs.
     *
     * @param {Object} data  The D3 data object
     * @param {Number} index The index position of element in parent container.
     *
     * @returns {Number} Calculated available width
     *
     * @private
     */
    getAvailableWidth(data, index)
    {
        // Outer arcs
        if (data.depth > this._configuration.numberOfInnerCircles) {
            return this._configuration.outerArcHeight
                - (this._configuration.textPadding * 2)
                - this._configuration.circlePadding;
        }

        // Innermost circle (Reducing the width slightly, avoiding the text is sticking too close to the edge)
        let availableWidth = (this._configuration.centerCircleRadius * 2) - (this._configuration.centerCircleRadius * 0.15);

        if (data.depth >= 1) {
            let positionFlipped = this.isPositionFlipped(data.depth, data.x0, data.x1);

            // Calculate length of the arc
            availableWidth = this._geometry.arcLength(data, this.getTextOffset(positionFlipped, index));
        }

        return availableWidth - (this._configuration.textPadding * 2)
            - (this._configuration.padDistance / 2);
    }

    /**
     * Transform the D3 <text> elements in the group. Rotate each <text> element depending on its offset,
     * so that they are equally positioned inside the arc.
     *
     * @param {selection} parent The D3 parent group object
     * @param {Object}    data   The The D3 data object
     *
     * @public
     */
    transformOuterText(parent, data)
    {
        let that          = this;
        let textElements  = parent.selectAll("text");
        let countElements = textElements.size();
        let offset        = 1.0;

        // Special offsets for shifting the text around depending on the depth
        switch (data.depth) {
            case 0: offset = 1.5; break;
            case 1: offset = 6.5; break;
            case 2: offset = 3.5; break;
            case 3: offset = 2.2; break;
            case 4: offset = 1.9; break;
            case 5: offset = 1.5; break;
            case 6: offset = 0.5; break;
        }

        let mapIndexToOffset = d3.scaleLinear()
            .domain([0, countElements - 1])
            .range([-offset, offset]);

        textElements.each(function (ignore, i) {
            const offsetRotate = mapIndexToOffset(i) * that._configuration.fontScale / 100.0;

            // Name of center person should not be rotated in any way
            if (data.depth === 0) {
                // TODO Depends on font-size
                d3.select(this).attr("dy", (offsetRotate * 14) + (14 / 2) + "px");
            } else {
                d3.select(this).attr("transform", function () {
                    let dx        = data.x1 - data.x0;
                    let angle     = that._geometry.scale(data.x0 + (dx / 2)) * MATH_RAD2DEG;
                    let rotate    = angle - (offsetRotate * (angle > 0 ? -1 : 1));
                    let translate = (that._geometry.centerRadius(data.depth) - (that._configuration.colorArcWidth / 2.0));

                    if (angle > 0) {
                        rotate -= 90;
                    } else {
                        translate = -translate;
                        rotate += 90;
                    }

                    return "rotate(" + rotate + ") translate(" + translate + ")";
                });
            }
        });
    }
}
