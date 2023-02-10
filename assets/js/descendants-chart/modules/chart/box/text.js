/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import OrientationLeftRight from "../orientation/orientation-leftRight";
import OrientationRightLeft from "../orientation/orientation-rightLeft";

/**
 * The person text box container.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Text
{
    /**
     * Constructor.
     *
     * @param {Orientation} orientation The current orientation
     * @param {null|Image}  image       The image
     */
    constructor(orientation, image = null)
    {
        this._orientation = orientation;
        this._image       = image;
        this._textPadding = 15;

        // Calculate values
        this._x     = this.calculateX();
        this._y     = this.calculateY();
        this._width = this.calculateWidth();
    }

    /**
     * Returns the calculated X-coordinate.
     *
     * @returns {Number}
     */
    calculateX()
    {
        const xStart = -(this._orientation.boxWidth / 2) + this._textPadding;

        if (!this._image) {
            return xStart;
        }

        // Adjust x position by width of image
        return xStart + this._image.width;
    }

    /**
     * Returns the calculated Y-coordinate.
     *
     * @returns {Number}
     */
    calculateY()
    {
        if ((this._orientation instanceof OrientationLeftRight)
            || (this._orientation instanceof OrientationRightLeft)
        ) {
            return -this._textPadding;
        }

        if (!this._image) {
            return -(this._orientation.boxHeight / 2) + (this._textPadding * 2);
        }

        return this._image.y + this._image.height + (this._textPadding * 2);
    }

    /**
     * Calculate the available text width.
     *
     * @returns {Number}
     */
    calculateWidth()
    {
        // Width of box minus the right/left padding
        const defaultWidth = this._orientation.boxWidth - (this._textPadding * 2);

        if (!this._image) {
            return defaultWidth;
        }

        if ((this._orientation instanceof OrientationLeftRight)
            || (this._orientation instanceof OrientationRightLeft)
        ) {
            return defaultWidth - this._image.width;
        }

        return defaultWidth;
    }

    /**
     * Returns the X-coordinate of the text start.
     *
     * @returns {Number}
     */
    get x()
    {
        return this._x;
    }

    /**
     * Returns the Y-coordinate of the text start.
     *
     * @returns {Number}
     */
    get y()
    {
        return this._y;
    }

    /**
     * Returns the width of the text.
     *
     * @returns {Number}
     */
    get width()
    {
        return this._width;
    }
}
