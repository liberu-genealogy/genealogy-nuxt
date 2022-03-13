/**
 * See LICENSE.md file for further details.
 */

import * as d3 from "./d3";
import Configuration from "./configuration";
import Hierarchy from "./chart/hierarchy";
import Overlay from "./chart/overlay";
import Svg from "./chart/svg";
import Person from "./chart/svg/person";
import Gradient from "./chart/gradient";
import Update from "./chart/update";

const MIN_HEIGHT  = 500;
const MIN_PADDING = 10;   // Minimum padding around view box

/**
 * This class handles the overall chart creation.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-fan-chart/
 */
export default class Chart
{
    /**
     * Constructor.
     *
     * @param {selection}     parent        The selected D3 parent element container
     * @param {Configuration} configuration The application configuration
     */
    constructor(parent, configuration)
    {
        this._configuration = configuration;
        this._parent        = parent;
        this._hierarchy     = new Hierarchy(this._configuration);
        this._data          = {};
    }

    /**
     * Returns the SVG instance.
     *
     * @return {Svg}
     */
    get svg()
    {
        return this._svg;
    }

    /**
     * Update/Calculate the viewBox attribute of the SVG element.
     *
     * @private
     */
    updateViewBox()
    {
        // Get bounding boxes
        let svgBoundingBox    = this._svg.visual.node().getBBox();
        let clientBoundingBox = this._parent.node().getBoundingClientRect();

        // View box should have at least the same width/height as the parent element
        let viewBoxWidth  = Math.max(clientBoundingBox.width, svgBoundingBox.width);
        let viewBoxHeight = Math.max(clientBoundingBox.height, svgBoundingBox.height, MIN_HEIGHT);

        // Calculate offset to center chart inside svg
        let offsetX = (viewBoxWidth - svgBoundingBox.width) / 2;
        let offsetY = (viewBoxHeight - svgBoundingBox.height) / 2;

        // Adjust view box dimensions by padding and offset
        let viewBoxLeft = Math.ceil(svgBoundingBox.x - offsetX - MIN_PADDING);
        let viewBoxTop  = Math.ceil(svgBoundingBox.y - offsetY - MIN_PADDING);

        // Final width/height of view box
        viewBoxWidth  = Math.ceil(viewBoxWidth + (MIN_PADDING * 2));
        viewBoxHeight = Math.ceil(viewBoxHeight + (MIN_PADDING * 2));

        // Set view box attribute
        this._svg.get()
            .attr("viewBox", [
                viewBoxLeft,
                viewBoxTop,
                viewBoxWidth,
                viewBoxHeight
            ]);

        // Add rectangle element
        // this._svg
        //     .insert("rect", ":first-child")
        //     .attr("class", "background")
        //     .attr("width", "100%")
        //     .attr("height", "100%")
        //     .style("fill", "none")
        //     .style("pointer-events", "all");
        //
        // // Adjust rectangle position
        // this._svg
        //     .select("rect")
        //     .attr("x", viewBoxLeft)
        //     .attr("y", viewBoxTop);
    }

    /**
     * Returns the chart data.
     *
     * @return {Object}
     */
    get data()
    {
        return this._data;
    }

    /**
     * Sets the chart data.
     *
     * @param {Object} value The chart data
     */
    set data(value)
    {
        this._data = value;

        // Create the hierarchical data structure
        this._hierarchy.init(this._data);
    }

    /**
     * This method draws the chart.
     */
    draw()
    {
        // Remove previously created content
        this._parent.html("");

        // Create the <svg> element
        this._svg = new Svg(this._parent, this._configuration);

        // Overlay must be placed after the <svg> element
        this._overlay = new Overlay(this._parent);

        // Init the <svg> events
        this._svg.initEvents(this._overlay);

        let personGroup = this._svg.get().select("g.personGroup");
        let gradient    = new Gradient(this._svg, this._configuration);
        let that        = this;

         personGroup
            .selectAll("g.person")
            .data(this._hierarchy.nodes, (d) => d.data.id)
            .enter()
            .append("g")
            .attr("class", "person")
            .attr("id", (d) => "person-" + d.data.id);

        // Create a new selection in order to leave the previous enter() selection
        personGroup
            .selectAll("g.person")
            .each(function (d) {
                let person = d3.select(this);

                if (that._configuration.showColorGradients) {
                    gradient.init(d);
                }

                new Person(that._svg, that._configuration, person, d);
            });

        this.bindClickEventListener();
        this.updateViewBox();
    }

    /**
     * This method bind the "click" event listeners to a "person" element.
     */
    bindClickEventListener()
    {
        let persons = this._svg.get()
            .select("g.personGroup")
            .selectAll("g.person")
            .filter((d) => d.data.xref !== "")
            .classed("available", true);

        // Trigger method on click
        persons.on("click", this.personClick.bind(this));
    }

    /**
     * Method triggers either the "update" or "individual" method on the click on an person.
     *
     * @param {Event}  event The current event
     * @param {Object} data  The D3 data object
     *
     * @private
     */
    personClick(event, data)
    {
        // Trigger either "update" or "redirectToIndividual" method on click depending on person in chart
        (data.depth === 0) ? this.redirectToIndividual(data.data.url) : this.update(data.data.updateUrl);
    }

    /**
     * Redirects to the individual page.
     *
     * @param {String} url The individual URL
     *
     * @private
     */
    redirectToIndividual(url)
    {
        window.location = url;
    }

    /**
     * Updates the chart with the data of the selected individual.
     *
     * @param {String} url The update URL
     */
    update(url)
    {
        let update = new Update(this._svg, this._configuration, this._hierarchy);

        update.update(url, () => this.bindClickEventListener());
    }
}
