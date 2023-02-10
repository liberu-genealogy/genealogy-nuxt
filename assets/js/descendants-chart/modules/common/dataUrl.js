/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

/**
 * Returns the input as data URL, prefixed with data: scheme.
 *
 * @param {RequestInfo}      input
 * @param {null|RequestInit} init
 *
 * @returns {Promise<unknown>}
 */
export default function(input, init = null)
{
    return fetch(input, init)
        .then(response => response.blob())
        .then(blob => new Promise(
            (resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            }
        )
    );
}
