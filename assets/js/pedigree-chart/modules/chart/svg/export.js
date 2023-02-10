/**
 * See LICENSE.md file for further details.
 */

/**
 * Base export class.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-pedigree-chart/
 */
export default class Export
{
    /**
     * Triggers the download by creating a new anchor element an simulate a mouse click on it.
     *
     * @param {String} imgURI   The image URI data stream
     * @param {String} fileName The file name to use in the download dialog
     */
    triggerDownload(imgURI, fileName)
    {
        let event = new MouseEvent("click", {
            view: window,
            bubbles: false,
            cancelable: true
        });

        let a = document.createElement("a");
        a.setAttribute("download", fileName);
        a.setAttribute("href", imgURI);
        a.setAttribute("target", "_blank");
        a.dispatchEvent(event);
    }
}
