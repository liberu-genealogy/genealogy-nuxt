/**
 * See LICENSE.md file for further details.
 */

/**
 * Draw the horizontal connecting lines between the profile boxes for Left/Right and Right/Left layout.
 *
 * @param {Object}      datum       D3 data object
 * @param {Orientation} orientation The current orientation
 */
export default function(datum, orientation)
{
    // Left => Right, Right => Left
    let sourceX = orientation.y(datum.source),
        sourceY = orientation.x(datum.source) + (orientation.direction() * (orientation.boxWidth / 2)),
        targetX = orientation.y(datum.target),
        targetY = orientation.x(datum.target) - (orientation.direction() * (orientation.boxWidth / 2));

    return "M " + sourceY + " " + sourceX +
        " H " + (sourceY + ((targetY - sourceY) / 2)) +
        " V " + targetX +
        " H " + targetY;
}
