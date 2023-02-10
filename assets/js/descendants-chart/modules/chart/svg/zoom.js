/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import * as d3 from "./../../d3";

/**
 * Constants
 *
 * @type {Number}
 */
const MIN_ZOOM = 0.1;
const MAX_ZOOM = 20.0;

/**
 * This class handles the zoom.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Zoom
{
    /**
     * Constructor.
     *
     * @param {selection} parent The selected D3 parent element container
     */
    constructor(parent)
    {
        this._zoom   = null;
        this._parent = parent;

        this.init();
    }

    /**
     * Initializes a new D3 zoom behavior.
     *
     * @private
     */
    init()
    {
        // Setup zoom and pan
        this._zoom = d3.zoom();

        this._zoom
            .scaleExtent([MIN_ZOOM, MAX_ZOOM])
            .on("zoom", (event) => {
                this._parent.attr("transform", event.transform);
            });

        // Adjust the wheel delta (see defaultWheelDelta() in zoom.js, which adds
        // a 10-times offset if ctrlKey is pressed)
        this._zoom.wheelDelta((event) => {
            return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002);
        });

        // Add zoom filter
        this._zoom.filter((event) => {
            // Allow "wheel" event only while control key is pressed
            if (event.type === "wheel") {
                if (!event.ctrlKey) {
                    return false;
                }

                var transform = d3.zoomTransform(this);

                if (transform.k) {
                    // Prevent zooming below lowest level
                    if ((transform.k <= MIN_ZOOM) && (event.deltaY > 0)) {
                        // Prevent browsers page zoom while holding down the control key
                        event.preventDefault();
                        return false;
                    }

                    // Prevent zooming above highest level
                    if ((transform.k >= MAX_ZOOM) && (event.deltaY < 0)) {
                        // Prevent browsers page zoom while holding down the control key
                        event.preventDefault();
                        return false;
                    }
                }

                return true;
            }

            // Allow touch events only with two fingers
            if (!event.button && (event.type === "touchstart")) {
                return event.touches.length === 2;
            }

            return (!event.ctrlKey || event.type === 'wheel') && !event.button;
        });
    }

    /**
     * Returns the internal d3 zoom behaviour.
     *
     * @returns {zoom}
     */
    get()
    {
        return this._zoom;
    }
}
