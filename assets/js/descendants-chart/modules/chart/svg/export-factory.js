/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import PngExport from "./export/png";
import SvgExport from "./export/svg";

/**
 * The file export factory.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class ExportFactory
{
    constructor()
    {
        this._exportClass = null;
    }

    setExportClass(type)
    {
        switch (type) {
            case 'png':
                this._exportClass = PngExport;
                break;
            case 'svg':
                this._exportClass = SvgExport;
                break;
            default:
                break;
        }
    };

    createExport(type)
    {
        this.setExportClass(type);

        switch (type) {
            case 'png':
                return new this._exportClass();
            case 'svg':
                return new this._exportClass();
        }
    };
}
