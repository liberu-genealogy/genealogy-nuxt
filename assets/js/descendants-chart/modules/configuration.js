/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import {LAYOUT_LEFTRIGHT} from "./constants";
import OrientationCollection from "./chart/orientation-collection";

/**
 * This class handles the configuration of the application.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Configuration
{
    /**
     * Constructor.
     *
     * @param {String[]} labels
     * @param {Number}   generations
     * @param {String}   treeLayout
     * @param {Boolean}  rtl
     * @param {Number}   direction
     */
    constructor(
        labels,
        generations = 4,
        treeLayout = LAYOUT_LEFTRIGHT,
        rtl = false,
        direction = 1
    ) {
        // The layout/orientation of the tree
        this._treeLayout   = treeLayout;
        this._orientations = new OrientationCollection();

        //
        this.duration = 750;

        //
        this.padding   = 15;

        // Padding around the image circle
        this.imagePadding = 5;

        // The radius of the image
        // this.imageRadius = (this.orientation.boxHeight / 2) - this.imagePadding;

        // The diameter of the image
        // this.imageDiameter = this.imageRadius * 2;

        // Default number of generations to display
        this._generations = generations;

        // Left/Right padding of text (used with truncation)
        this.textPadding = 8;

        // // Default font size, color and scaling
        this._fontSize  = 14;
        // this._fontScale = fontScale;
        this.fontColor = "rgb(0, 0, 0)";

        // Duration of update animation if clicked on a person
        // this.updateDuration = 1250;

        this.rtl    = rtl;
        this.labels = labels;

        // direction` is either 1 (forward) or -1 (backward)
        this.direction = direction;
    }

    /**
     * Returns the number of generations to display.
     *
     * @returns {Number}
     */
    get generations()
    {
        return this._generations;
    }

    /**
     * Sets the number of generations to display.
     *
     * @param {Number} value The number of generations to display
     */
    set generations(value)
    {
        this._generations = value;
    }

    /**
     * Returns the tree layout.
     *
     * @returns {String}
     */
    get treeLayout()
    {
        return this._treeLayout;
    }

    /**
     * Sets the tree layout.
     *
     * @param {String} value Tree layout value
     */
    set treeLayout(value)
    {
        this._treeLayout = value;
    }

    /**
     * Returns the current orientation.
     *
     * @returns {Orientation}
     */
    get orientation()
    {
        return this._orientations.get()[this.treeLayout];
    }
}
