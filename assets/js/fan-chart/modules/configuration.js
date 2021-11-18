/**
 * See LICENSE.md file for further details.
 */

/**
 * This class handles the configuration of the application.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-fan-chart/
 */
export default class Configuration
{
    /**
     * Constructor.
     *
     * @param {String[]}  labels
     * @param {Number}    generations
     * @param {Number}    fanDegree
     * @param {String}    defaultColor
     * @param {Number}    fontScale
     * @param {String}    fontColor
     * @param {Boolean}   hideEmptySegments
     * @param {Boolean}   showColorGradients
     * @param {Boolean}   showParentMarriageDates
     * @param {Boolean}   rtl
     * @param {Number}    innerArcs
     */
    constructor(
        labels,
        generations = 6,
        fanDegree = 210,
        defaultColor = "rgb(238, 238, 238)",
        fontScale = 100,
        fontColor = "rgb(0, 0, 0)",
        hideEmptySegments = false,
        showColorGradients = false,
        showParentMarriageDates = false,
        rtl = false,
        innerArcs = 4
    ) {
        // Default number of generations to display
        this._generations = generations;

        // Padding in pixel between each generation circle
        this.circlePadding = 0;

        if (showParentMarriageDates) {
            this.circlePadding = 40;
        }

        this.padAngle = 0.03;
        this.padRadius = this.circlePadding * 10;
        this.padDistance = this.padAngle * this.padRadius;
        this.cornerRadius = 0;

        // Number of circles, large enough to print text along arc path
        this._numberOfInnerCircles = innerArcs;

        // Radius of the innermost circle
        this.centerCircleRadius = 85;

        // Height of each inner circle arc
        this.innerArcHeight = 85;

        // Height of each outer circle arc
        this.outerArcHeight = 110;

        if (showParentMarriageDates) {
            this.innerArcHeight = this.circlePadding + 110;
            this.outerArcHeight = this.circlePadding + 110;
        }

        // Width of the colored arc above each single person arc
        this.colorArcWidth = 5;

        // Left/Right padding of text (used with truncation)
        this.textPadding = 8;

        // Default background color of an arc
        this.defaultColor = defaultColor;

        // Default font size, color and scaling
        this._fontSize  = 15;
        this._fontScale = fontScale;
        this.fontColor = fontColor;

        this._hideEmptySegments  = hideEmptySegments;
        this._showColorGradients = showColorGradients;
        this._showParentMarriageDates = showParentMarriageDates;

        // Duration of update animation if clicked on a person
        this.updateDuration = 1250;

        // Default degrees of the fan chart
        this._fanDegree = fanDegree;

        this.rtl    = rtl;
        this.labels = labels;

        // Helper method to create a ongoing id
        this.id = (() => {
            let i = 1;

            return function (reset = false) {
                if (reset) {
                    i = 0;
                }

                return i++;
            };
        })();
    }

    /**
     * Returns the number of generations to display.
     *
     * @return {Number}
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
     * Returns the degrees of the fan chart.
     *
     * @return {Number}
     */
    get fanDegree()
    {
        return this._fanDegree;
    }

    /**
     * Sets the degrees of the fan chart.
     *
     * @param {Number} value The degrees of the fan chart
     */
    set fanDegree(value)
    {
        this._fanDegree = value;
    }

    /**
     * Returns the font scaling.
     *
     * @return {Number}
     */
    get fontScale()
    {
        return this._fontScale;
    }

    /**
     * Sets the font scaling.
     *
     * @param {Number} value The font scaling
     */
    set fontScale(value)
    {
        this._fontScale = value;
    }

    /**
     * Returns whether to show or hide empty chart segments.
     *
     * @return {Boolean}
     */
    get hideEmptySegments()
    {
        return this._hideEmptySegments;
    }

    /**
     * Sets whether to show or hide empty chart segments.
     *
     * @param {Boolean} value Either true or false
     */
    set hideEmptySegments(value)
    {
        this._hideEmptySegments = value;
    }

    /**
     * Returns whether to show or hide a color gradient above each arc or display male/female colors instead.
     *
     * @return {Boolean}
     */
    get showColorGradients()
    {
        return this._showColorGradients;
    }

    /**
     * Sets whether to show or hide a color gradient above each arc or display male/female colors instead.
     *
     * @param {Boolean} value Either true or false
     */
    set showColorGradients(value)
    {
        this._showColorGradients = value;
    }

    /**
     * Returns whether to show or hide the parent marriage dates.
     *
     * @return {Boolean}
     */
    get showParentMarriageDates()
    {
        return this._showParentMarriageDates;
    }

    /**
     * Sets whether to show or hide the parent marriage dates.
     *
     * @param {Boolean} value Either true or false
     */
    set showParentMarriageDates(value)
    {
        this._showParentMarriageDates = value;
    }

    /**
     * Returns the number of inner arcs to display.
     *
     * @return {Number}
     */
    get numberOfInnerCircles()
    {
        return this._numberOfInnerCircles;
    }

    /**
     * Sets the number of inner arcs to display.
     *
     * @param {Number} value The number of inner arcs
     */
    set numberOfInnerCircles(value)
    {
        this._numberOfInnerCircles = value;
    }

    /**
     * Returns the font size in pixel.
     *
     * @return {Number}
     */
    get fontSize()
    {
        return this._fontSize;
    }
}
