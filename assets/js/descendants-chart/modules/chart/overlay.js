/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

/**
 * This class handles the tooltip overlay.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Overlay
{
    /**
     * Constructor.
     *
     * @param {selection} parent The selected D3 parent element container
     */
    constructor(parent)
    {
        // Create the tooltip overlay container
        this._element = parent
            .append("div")
            .attr("class", "overlay")
            .style("opacity", 1e-6);
    }

    /**
     * Stop any pending transition and hide overlay immediately.
     *
     * @param {String}   text     Text to display in overlay
     * @param {Number}   duration Duration of transition in msec
     * @param {Function} callback Callback method to execute on end of transition
     */
    show(text, duration = 0, callback = null)
    {
        // Remove any previously added <p> element
        this._element
            .select("p")
            .remove();

        this._element
            .append("p")
            .attr("class", "tooltip")
            .text(text);

        this._element
            .transition()
            .duration(duration)
            .style("opacity", 1)
            .on("end", () => {
                if (typeof callback === "function") {
                    callback();
                }
            });
    }

    /**
     * Stop any pending transition and hide overlay immediately.
     *
     * @param {Number} delay    Delay in milliseconds to wait before transition should start
     * @param {Number} duration Duration of transition in milliseconds
     */
    hide(delay = 0, duration = 0)
    {
        this._element
            .transition()
            .delay(delay)
            .duration(duration)
            .style("opacity", 1e-6);
    }

    /**
     * Returns the internal element.
     *
     * @returns {selection}
     */
    get()
    {
        return this._element;
    }
}
