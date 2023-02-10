/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Returns the DPI of the current device.
 *
 * @returns {Number}
 */
export default function()
{
    const element = document.createElement('div');
    element.style = 'width: 1in;'

    document.body.appendChild(element);
    const offsetWidth = element.offsetWidth;
    document.body.removeChild(element);

    return (window.devicePixelRatio || 1) * offsetWidth;
}
