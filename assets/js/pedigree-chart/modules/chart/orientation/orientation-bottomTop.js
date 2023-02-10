/**
 * See LICENSE.md file for further details.
 */

import Orientation from "./orientation";
import elbowVertical from "../elbow/vertical";

/**
 * This class handles the orientation of the tree.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
 */
export default class OrientationBottomTop extends Orientation
{
    /**
     * Constructor.
     *
     * @param {Number} boxWidth  The width of a single individual box
     * @param {Number} boxHeight The height of a single individual box
     */
    constructor(boxWidth, boxHeight)
    {
        super(boxWidth, boxHeight);

        this._splittNames = true;
    }

    direction()
    {
        return -1;
    }

    nodeWidth()
    {
        return (this._boxWidth * 2) + 30;
    }

    imageCornerRadius()
    {
        return this.cornerRadius() - this._imagePadding;
    }

    /**
     * Returns the X coordinate of the image position.
     *
     * @returns {Number}
     */
    imageX()
    {
        return -(this._boxWidth / 2) + this._imagePadding;
    }

    /**
     * Returns the Y coordinate of the image position.
     *
     * @returns {Number}
     */
    imageY()
    {
        return -(this._boxHeight / 2) + this._imagePadding;
    }

    imageWidth()
    {
        return this._boxWidth - (this._imagePadding * 2);
    }

    imageHeight()
    {
        return this.imageRadius() * 2;
    }

    textX()
    {
        return -(this._boxWidth / 2) + (this.imageRadius() * 2) + 20 - this._imagePadding;
    }

    textY()
    {
        return this.imageY() + this.imageHeight() + 20;
    }

    /**
     * Calculate the available text width.
     *
     * @returns {Number}
     */
    textWidth()
    {
        return this.imageWidth();
    }

    norm(d)
    {
        d.y = this.direction() * d.depth * (this._boxHeight + 30);
    }

    elbow(d)
    {
        return elbowVertical(d, this);
    }

    x(d)
    {
        return d.x;
    }

    y(d)
    {
        return d.y;
    }
}
