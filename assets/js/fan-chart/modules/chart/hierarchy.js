/**
 * See LICENSE.md file for further details.
 */

import * as d3 from "./../d3";
import Configuration from "./../configuration";

export const SEX_MALE   = "M";
export const SEX_FEMALE = "F";

/**
 * This class handles the hierarchical data.
 *
 * @author  Rico Sonntag <mail@ricosonntag.de>
 * @license https://opensource.org/licenses/GPL-3.0 GNU General Public License v3.0
 * @link    https://github.com/magicsunday/webtrees-fan-chart/
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
    }

    /**
     * Initialize the hierarchical chart data.
     *
     * @param {Object} data The JSON encoded chart data
     */
    init(data)
    {
        // Get the greatest depth
        // const getDepth       = ({children}) => 1 + (children ? Math.max(...children.map(getDepth)) : 0);
        // const maxGenerations = getDepth(data);

        // Construct root node from the hierarchical data
        let root = d3.hierarchy(
            data,
            data => {
                // Fill up the missing children to the requested number of generations
                // if (!data.children && (data.generation < maxGenerations)) {
                if (!data.children && (data.generation < this._configuration.generations)) {
                    data.children = [
                        this.createEmptyNode(data.generation + 1, SEX_MALE),
                        this.createEmptyNode(data.generation + 1, SEX_FEMALE)
                    ];
                }

                // Add missing parent record if we got only one
                if (data.children && (data.children.length < 2)) {
                    if (data.children[0].sex === SEX_MALE) {
                        data.children.push(
                            this.createEmptyNode(data.generation + 1, SEX_FEMALE)
                        );
                    } else {
                        data.children.unshift(
                            this.createEmptyNode(data.generation + 1, SEX_MALE)
                        );
                    }
                }

                return data.children;
            })
            // Calculate number of leaves
            .count();

        // Create partition layout
        let partitionLayout = d3.partition();

        // Map the node data to the partition layout
        this._nodes = partitionLayout(root).descendants();

        // Create unique ids for each element
        this._nodes.forEach(entry => {
            entry.data.id = this._configuration.id();
        });

        this._configuration.id(true);
    }

    /**
     * Returns the nodes.
     *
     * @return {Array}
     */
    get nodes()
    {
        return this._nodes;
    }

    /**
     * Create an empty child node object.
     *
     * @param {Number} generation Generation of the node
     * @param {String} sex        The sex of the individual
     *
     * @return {Object}
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
            timespan         : "",
            color            : this._configuration.defaultColor,
            colors           : [[], []]
        };
    }
}
