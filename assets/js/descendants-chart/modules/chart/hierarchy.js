/**
 * This file is part of the package magicsunday/webtrees-descendants-chart.
 *
 * For the full copyright and license information, please read the
 * LICENSE file that was distributed with this source code.
 */

import * as d3 from "../d3";

/**
 * This class handles the hierarchical data.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-descendants-chart/
 */
export default class Hierarchy
{
    /**
     * Constructor.
     *
     * @param {Configuration} configuration The application configuration
     */
    constructor(configuration)
    {
        this._configuration = configuration;
        this._nodes         = null;
        this._root          = null;
    }

    /**
     * Initialize the hierarchical chart data.
     *
     * @param {Object} data The JSON encoded chart data
     */
    init(data)
    {
        // Get the greatest depth
        const getDepth       = ({children}) => 1 + (children ? Math.max(...children.map(getDepth)) : 0);
        // const maxGenerations = getDepth(data);

        // Construct root node from the hierarchical data
        let root = d3.hierarchy(
            data,
            data => {
                return data.children;
            });

        // Declares a tree layout and assigns the size
        const treeLayout = d3.tree()
            .nodeSize([this._configuration.orientation.nodeWidth, 0])
            .separation(() => 0.5);

        // Map the node data to the tree layout
        this._root  = root;
        this._nodes = treeLayout(root);
    }

    /**
     * Returns the nodes.
     *
     * @returns {Array}
     *
     * @public
     */
    get nodes()
    {
        return this._nodes;
    }

    /**
     * Returns the root note.
     *
     * @returns {Object}
     *
     * @public
     */
    get root()
    {
        return this._root;
    }

    /**
     * Create an empty child node object.
     *
     * @param {Number} generation Generation of the node
     * @param {String} sex        The sex of the individual
     *
     * @returns {Object}
     *
     * @private
     */
    createEmptyNode(generation, sex)
    {
        return {
            id               : 0,
            xref             : "",
            url              : "",
            updateUrl        : "",
            generation       : generation,
            name             : "",
            firstNames       : [],
            lastNames        : [],
            preferredName    : "",
            alternativeNames : [],
            isAltRtl         : false,
            sex              : sex,
            timespan         : ""
        };
    }
}
