/**
 * See LICENSE.md file for further details.
 */

/**
 * Filter definition class
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-fan-chart/
 */
export default class Filter
{
    /**
     * Constructor.
     *
     * @param {selection} defs The selected D3 parent element container
     */
    constructor(defs)
    {
        // Create the <svg:defs> element
        this._element = defs;

        // Filter is set in CSS via "filter: url(#drop-shadow);"

        // Chrome still does not support filtering SVG elements using CSS other than the root
        // https://bugs.chromium.org/p/chromium/issues/detail?id=109224
        let filter = this._element
            .append("filter")
            .attr("id", "drop-shadow");

        filter.append("feDropShadow")
            .attr("stdDeviation", "7 7")
            .attr("dx", "0")
            .attr("dy", "0")
            .attr("flood-opacity", "0.3")
            .attr("flood-color", "rgb(0,0,0)");
    }

    /**
     * Returns the internal element.
     *
     * @return {selection}
     */
    get()
    {
        return this._element;
    }
}
