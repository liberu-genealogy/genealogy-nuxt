/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */
import * as d3 from "./d3";
import Hierarchy from "./chart/hierarchy";
import Tree from "./tree";
import Overlay from "./chart/overlay";
import Svg from "./chart/svg";

const MIN_HEIGHT  = 300;
const MIN_PADDING = 10;   // Minimum padding around view box

/**
 * This class handles the overall chart creation.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
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
     * @returns {Svg}
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

        // this._svg.visual
        //     .attr("transform", "translate(" + (-viewBoxLeft) + ", " + (-viewBoxTop) + ")");
        //
        // this._svg.get()
        //     .attr("width", viewBoxWidth)
        //     .attr("height", viewBoxHeight);

        // Set view box attribute
        this._svg.get()
            .attr("viewBox", [
                viewBoxLeft,
                viewBoxTop,
                viewBoxWidth,
                viewBoxHeight
            ]);
    }

    /**
     * Returns the chart data.
     *
     * @returns {Object}
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

        let tree = new Tree(this._svg, this._configuration, this._hierarchy);

        // let personGroup = this._svg.get().select("g.personGroup");
        // let gradient    = new Gradient(this._svg, this._configuration);
        // let that        = this;
        //
        // personGroup
        //     .selectAll("g.person")
        //     .data(this._hierarchy.nodes, (d) => d.data.id)
        //     .enter()
        //     .append("g")
        //     .attr("class", "person")
        //     .attr("id", (d) => "person-" + d.data.id);
        //
        // // Create a new selection in order to leave the previous enter() selection
        // personGroup
        //     .selectAll("g.person")
        //     .each(function (d) {
        //         let person = d3.select(this);
        //
        //         if (that._configuration.showColorGradients) {
        //             gradient.init(d);
        //         }
        //
        //         new Person(that._svg, that._configuration, person, d);
        //     });

        this.bindClickEventListener();
        this.updateViewBox();
    }

    /**
     * This method bind the "click" event listeners to a "person" element.
     */
    bindClickEventListener()
    {
        let that = this;

        this._svg.visual
            .selectAll("g.person")
            .filter((d) => d.data.xref !== "")
            .each(function (d) {
                d3.select(this).on("click", function() { that.personClick(d.data); });
            });
    }

    /**
     * Method triggers either the "update" or "individual" method on the click on an person.
     *
     * @param {Object} data The D3 data object
     *
     * @private
     */
    personClick(data)
    {
        // Trigger either "update" or "redirectToIndividual" method on click depending on person in chart
        (data.generation === 1) ? this.redirectToIndividual(data.url) : this.update(data.updateUrl);
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
        window.location = url;
    }

    // /**
    //  * Changes root individual
    //  *
    //  * @param {String} url The update url
    //  *
    //  * @private
    //  */
    // update(url)
    // {
    //     var that = this;
    //
    //     $.getJSON(url, function(data) {
    //         that.data = data;
    //         that.draw();
    //
    //         var indSelector = $(document.getElementById('xref'));
    //         $.ajax({
    //             type: 'POST',
    //             url: indSelector.attr("data-ajax--url"),
    //             data: { q : data.xref }
    //         }).then(function (data) {
    //             // create the option and append to Select2
    //             var option = new Option(data.results[0].text, data.results[0].id, true, true);
    //             indSelector.append(option).trigger('change');
    //         });
    //     });
    // }
}
