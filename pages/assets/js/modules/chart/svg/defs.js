/**
 * See LICENSE.md file for further details.
 */

/**
 * SVG definition class
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
 */
export default class Defs
{
    /**
     * Constructor.
     *
     * @param {Selection} svg The selected D3 parent element container
     */
    constructor(svg)
    {
        // Create the <svg:defs> element
        this._element = svg.append("defs");
    }

    /**
     * Returns the internal element.
     *
     * @returns {Selection}
     */
    get()
    {
        return this._element;
    }
}
