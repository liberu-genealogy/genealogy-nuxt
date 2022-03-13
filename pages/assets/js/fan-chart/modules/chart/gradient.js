/**
 * See LICENSE.md file for further details.
 */

import Configuration from "./../configuration";
import {SEX_FEMALE, SEX_MALE} from "./hierarchy";
import Geometry from "./svg/geometry";

/**
 * This class handles the gradient coloring.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-fan-chart/
 */
export default class Gradient
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
     * Initializes the gradient fill.
     *
     * @param {Object} data D3 data object
     *
     * @return {void}
     */
    init(data)
    {
        if (data.depth < 1) {
            return;
        }

        if (data.depth === 1) {
            // Define initial gradient colors starting with second generation
            let color1 = [64, 143, 222];
            let color2 = [161, 219, 117];

            if (data.data.sex === SEX_FEMALE) {
                color1 = [218, 102, 13];
                color2 = [235, 201, 33];
            }

            data.data.colors = [color1, color2];
        } else {
            // Calculate subsequent gradient colors
            let c = [
                Math.ceil((data.parent.data.colors[0][0] + data.parent.data.colors[1][0]) / 2.0),
                Math.ceil((data.parent.data.colors[0][1] + data.parent.data.colors[1][1]) / 2.0),
                Math.ceil((data.parent.data.colors[0][2] + data.parent.data.colors[1][2]) / 2.0),
            ];

            if (data.data.sex === SEX_MALE) {
                data.data.colors[0] = data.parent.data.colors[0];
                data.data.colors[1] = c;
            }

            if (data.data.sex === SEX_FEMALE) {
                data.data.colors[0] = c;
                data.data.colors[1] = data.parent.data.colors[1];
            }
        }

        // Add a new radial gradient
        let newGrad = this._svg.defs.get()
            .append("svg:linearGradient")
            .attr("id", "grad-" + data.data.id);

        // Define start and stop colors of gradient
        newGrad.append("svg:stop")
            .attr("offset", "0%")
            .attr("stop-color", "rgb(" + data.data.colors[0].join(",") + ")");

        newGrad.append("svg:stop")
            .attr("offset", "100%")
            .attr("stop-color", "rgb(" + data.data.colors[1].join(",") + ")");
    }
}
