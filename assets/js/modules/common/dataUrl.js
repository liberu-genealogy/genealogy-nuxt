/**
 * See LICENSE.md file for further details.
 */

/**
 * Returns the input as data URL, prefixed with data: scheme.
 *
 * @param {RequestInfo} input
 * @param {RequestInit} init
 *
 * @returns {Promise<unknown>}
 */
export default function(input, init)
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
