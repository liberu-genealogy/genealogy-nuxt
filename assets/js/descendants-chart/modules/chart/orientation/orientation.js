/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

/**
 * The orientation base class.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Orientation
{
    /**
     * Constructor.
     *
     * @param {Number} boxWidth  The width of a single individual box
     * @param {Number} boxHeight The height of a single individual box
     */
    constructor(boxWidth, boxHeight)
    {
        this._boxWidth    = boxWidth;
        this._boxHeight   = boxHeight;
        this._splittNames = false;
    }

    /**
     * Returns whether to splitt the names on multiple lines or not.
     *
     * @returns {Boolean}
     */
    get splittNames()
    {
        return this._splittNames;
    }

    /**
     * Returns the width of the box.
     *
     * @returns {Number}
     */
    get boxWidth()
    {
        return this._boxWidth;
    }

    /**
     * Returns the height of the box.
     *
     * @returns {Number}
     */
    get boxHeight()
    {
        return this._boxHeight;
    }

    /**
     * Returns the direction.
     *
     * @returns {Number}
     */
    direction()
    {
        throw "Abstract method direction() not implemented";
    }

    /**
     * Returns the width of the node.
     *
     * @returns {Number}
     */
    nodeWidth()
    {
        throw "Abstract method nodeWidth() not implemented";
    }

    /**
     * Normalizes the x and/or y values of an entry.
     */
    norm(d)
    {
        throw "Abstract method norm() not implemented";
    }

    /**
     * Returns the elbow function depending on the orientation.
     *
     * @returns {String}
     */
    elbow(d)
    {
        throw "Abstract method elbow() not implemented";
    }
}
