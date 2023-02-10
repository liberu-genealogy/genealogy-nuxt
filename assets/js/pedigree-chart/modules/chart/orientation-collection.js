/**
 * See LICENSE.md file for further details.
 */

import {LAYOUT_BOTTOMTOP, LAYOUT_LEFTRIGHT, LAYOUT_RIGHTLEFT, LAYOUT_TOPBOTTOM} from "../constants";
import OrientationTopBottom from "./orientation/orientation-topBottom";
import OrientationBottomTop from "./orientation/orientation-bottomTop";
import OrientationLeftRight from "./orientation/orientation-leftRight";
import OrientationRightLeft from "./orientation/orientation-rightLeft";

/**
 * This class handles the orientation of the tree.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
 */
export default class OrientationCollection
{
    /**
     * Constructor.
     */
    constructor()
    {
        this._orientations = {
            [LAYOUT_TOPBOTTOM]: new OrientationTopBottom(150, 175),
            [LAYOUT_BOTTOMTOP]: new OrientationBottomTop(150, 175),
            [LAYOUT_LEFTRIGHT]: new OrientationLeftRight(300, 80),
            [LAYOUT_RIGHTLEFT]: new OrientationRightLeft(300, 80)
        };
    }

    /**
     * Returns the internal element.
     *
     * @returns {Array}
     */
    get()
    {
        return this._orientations;
    }
}
