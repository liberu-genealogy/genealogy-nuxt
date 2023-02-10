/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import Image from "./box/image";
import Text from "./box/text";

/**
 * A person box.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Box
{
    /**
     * Constructor.
     *
     * @param {Orientation} orientation The current orientation
     */
    constructor(orientation)
    {
        // The default corner radius
        this._cornerRadius = 20;
        this._showImage    = true;
        this._orientation  = orientation;

        // Calculate values
        this._x      = -(orientation.boxWidth / 2);
        this._y      = -(orientation.boxHeight / 2);
        this._rx     = this._cornerRadius;
        this._ry     = this._cornerRadius;
        this._width  = orientation.boxWidth;
        this._height = orientation.boxHeight;

        this._image = new Image(orientation, this._cornerRadius);
    }

    /**
     * Returns TRUE if image should be displayed otherwise FALSE.
     *
     * @returns {Boolean}
     */
    get showImage()
    {
        return this._showImage;
    }

    /**
     * Set TRUE to show image or FALSE to hide.
     *
     * @param {Boolean} value
     */
    set showImage(value)
    {
        this._showImage = value;
    }

    /**
     * Returns the X-coordinate of the center of the box.
     *
     * @returns {Number}
     */
    get x()
    {
        return this._x;
    }

    /**
     * Returns the Y-coordinate of the center of the box.
     *
     * @returns {Number}
     */
    get y()
    {
        return this._y;
    }

    /**
     * Returns the horizontal corner radius of the box.
     *
     * @returns {Number}
     */
    get rx()
    {
        return this._rx;
    }

    /**
     * Returns the vertical corner radius of the box.
     *
     * @returns {Number}
     */
    get ry()
    {
        return this._ry;
    }

    /**
     * Returns the width of the box.
     *
     * @returns {Number}
     */
    get width()
    {
        return this._width;
    }

    /**
     * Returns the height of the box.
     *
     * @returns {Number}
     */
    get height()
    {
        return this._height;
    }

    /**
     * Returns the image container.
     *
     * @returns {Image}
     */
    get image()
    {
        return this._image;
    }

    /**
     * Returns the text container instance.
     *
     * @returns {Text}
     */
    get text()
    {
        return new Text(
            this._orientation,
            this._showImage ? this._image : null
        );
    }
}
