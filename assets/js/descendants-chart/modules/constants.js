/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

/**
 * The widths and heights of a single node in each tree layout.
 *
 * @type {Number}
 */
export const LAYOUT_HORIZONTAL_NODE_WIDTH  = 300;
export const LAYOUT_HORIZONTAL_NODE_HEIGHT = 80;
export const LAYOUT_VERTICAL_NODE_WIDTH    = 150;
export const LAYOUT_VERTICAL_NODE_HEIGHT   = 175;

/**
 * Tree layout variants.
 *
 * @type {String}
 *
 * @see \Fisharebest\Webtrees\Module\PedigreeChartModule
 */
export const LAYOUT_TOPBOTTOM = "down";
export const LAYOUT_BOTTOMTOP = "up";
export const LAYOUT_LEFTRIGHT = "right";
export const LAYOUT_RIGHTLEFT = "left";

/**
 * Gender types.
 *
 * @type {String}
 */
export const SEX_MALE    = "M";
export const SEX_FEMALE  = "F";
export const SEX_UNKNOWN = "U";
