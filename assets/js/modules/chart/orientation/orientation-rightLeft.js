/**
 * See LICENSE.md file for further details.
 */

import Orientation from "./orientation";
import elbowHorizontal from "../elbow/horizontal";

/**
 * This class handles the orientation of the tree.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
 */
export default class OrientationRightLeft extends Orientation
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

        this._splittNames = false;
    }

    direction()
    {
        return -1;
    }

    nodeWidth()
    {
        return (this._boxHeight * 2) + 30;
    }

    imageCornerRadius()
    {
        return this.cornerRadius() - this._imagePadding;
    }

    imageX()
    {
        return -(this._boxWidth / 2) + this._imagePadding;
    }

    imageY()
    {
        return -this.imageRadius();
    }

    imageWidth()
    {
        return this.imageRadius() * 2;
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
        return -15;
    }

    /**
     * Calculate the available text width.
     *
     * @returns {Number}
     */
    textWidth()
    {
        return this._boxWidth - ((this.imageRadius() * 2) + 15 + this._imagePadding) - (15 * 2);
    }

    norm(d)
    {
        d.y = this.direction() * d.depth * (this._boxWidth + 30);
    }

    elbow(d)
    {
        return elbowHorizontal(d, this);
    }

    x(d)
    {
        return d.y;
    }

    y(d)
    {
        return d.x;
    }
}
