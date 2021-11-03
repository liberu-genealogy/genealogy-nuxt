/**
 * See LICENSE.md file for further details.
 */

/**
 * Draw the vertical connecting lines between the profile boxes for Top/Bottom and Bottom/Top layout.
 *
 * @param {Object}      datum       D3 data object
 * @param {Orientation} orientation The current orientation
 */
export default function(datum, orientation)
{
    // Left => Right, Right => Left
    let sourceX = orientation.x(datum.source),
        sourceY = orientation.y(datum.source) + (orientation.direction() * (orientation.boxHeight / 2)),
        targetX = orientation.x(datum.target),
        targetY = orientation.y(datum.target) - (orientation.direction() * (orientation.boxHeight / 2));

    return "M " + sourceX + " " + sourceY +
        " V " + (sourceY + ((targetY - sourceY) / 2)) +
        " H " + targetX +
        " V " + targetY;
}
