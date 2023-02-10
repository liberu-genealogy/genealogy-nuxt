/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import * as d3 from "./../d3";

/**
 * This class handles the visual update of all text and path elements.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Update
{
    /**
     * Constructor.
     *
     * @param {Svg}           svg
     * @param {Configuration} configuration The application configuration
     * @param {Hierarchy}     hierarchy
     */
    constructor(svg, configuration, hierarchy)
    {
        this._svg           = svg;
        this._configuration = configuration;
        this._hierarchy     = hierarchy;
    }

    /**
     * Update the chart with data loaded from AJAX.
     *
     * @param {String}   url      The update URL
     * @param {Function} callback The callback method to execute after the update
     *
     * @public
     */
    update(url, callback)
    {
        let that = this;

        this._svg.get()
            .selectAll("g.person")
            .classed("hover", false)
            .on("click", null)
            .on("mouseover", null)
            .on("mouseout", null);

        d3.json(
            url
        ).then((data) => {
            // Initialize the new loaded data
            this._hierarchy.init(data);
            that.draw();

            let indSelector = $(document.getElementById("xref"));

            $.ajax({
                type: "POST",
                url: indSelector.attr("data-ajax--url"),
                data: {
                    q : data.xref
                }
            }).then(function (data) {
                // Create the option and append to Select2
                let option = new Option(data.results[0].text, data.results[0].id, true, true);

                indSelector.append(option);
                indSelector.trigger("change");
            });
        });
    }
}
