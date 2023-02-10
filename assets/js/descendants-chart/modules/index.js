/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import * as d3 from "./d3";
import Configuration from "./configuration";
import Chart from "./chart";

/**
 * The application class.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export class DescendantsChart
{
    /**
     * Constructor.
     *
     * @param {String} selector The CSS selector of the HTML element used to assign the chart too
     * @param {Object} options  A list of options passed from outside to the application
     *
     * @param {String[]} options.labels
     * @param {Number}   options.generations
     * @param {String}   options.treeLayout
     * @param {Boolean}  options.rtl
     */
    constructor(selector, options)
    {
        this._selector = selector;
        this._parent   = d3.select(this._selector);

        // Set up configuration
        this._configuration = new Configuration(
            options.labels,
            options.generations,
            options.treeLayout,
            options.rtl
        );

        // Set up chart instance
        this._chart = new Chart(this._parent, this._configuration);

        this.init();
    }

    /**
     * @private
     */
    init()
    {
        // Bind click event on center button
        d3.select("#centerButton")
            .on("click", () => this.center());

        // Bind click event on export as PNG button
        d3.select("#exportPNG")
            .on("click", () => this.exportPNG());

        // Bind click event on export as SVG button
        d3.select("#exportSVG")
            .on("click", () => this.exportSVG());
    }

    /**
     * Resets the chart to initial zoom level and position.
     *
     * @private
     */
    center()
    {
        this._chart
            .svg.get()
            .transition()
            .duration(750)
            .call(this._chart.svg.zoom.get().transform, d3.zoomIdentity);
    }

    /**
     * Returns the configuration object.
     *
     * @returns {Configuration}
     */
    get configuration()
    {
        return this._configuration;
    }

    /**
     * Sets the URL to the CSS file used in SVG export.
     *
     * @param {String} cssFile
     */
    set cssFile(cssFile)
    {
        this._cssFile = cssFile;
    }

    /**
     * Updates the chart.
     *
     * @param {Object} url The update url
     */
    update(url) { this._chart.update(url); }

    /**
     * Draws the chart.
     *
     * @param {Object} data The JSON encoded chart data
     */
    draw(data)
    {
        this._chart.data = data;
        this._chart.draw();
    }

    /**
     * Exports the chart as PNG image and triggers a download.
     *
     * @private
     */
    exportPNG()
    {
        this._chart.svg
            .export('png')
            .svgToImage(this._chart.svg, "descendants-chart.png");

    }

    /**
     * Exports the chart as SVG image and triggers a download.
     *
     * @private
     */
    exportSVG()
    {
        this._chart.svg
            .export('svg')
            .svgToImage(this._chart.svg, this._cssFile, "descendants-chart.svg");
    }
}
