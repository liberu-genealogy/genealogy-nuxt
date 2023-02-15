import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default [

    {
        input: "assets/js/pedigree-chart/modules/index.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart/pedigree-chart.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve()
        ]
    },
    {
        input: "assets/js/fan-chart/modules/index.js",
        output: [
            {
                name: "WebtreesFanChart",
                file: "assets/js/fan-chart/fan-chart.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve()
        ]
    },
    {
        input: "assets/js/fan-chart/modules/index.js",
        output: [
            {
                name: "WebtreesFanChart",
                file: "assets/js/fan-chart/fan-chart.min.js",
                format: "umd"
            }
        ],plugins: [
            resolve(),
            terser({
                mangle: true,
                compress: true,
                module: true,
                output: {
                    comments: false
                }
            })
        ]
    },
    {
        input: "assets/js/pedigree-chart/modules/index.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart/pedigree-chart.min.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve(),
            terser({
                mangle: true,
                compress: true,
                module: true,
                output: {
                    comments: false
                }
            })
        ]
    },

    // pedigree-chart-storage.js
    {
        input: "assets/js/pedigree-chart/modules/storage.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart/pedigree-chart-storage.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve()
        ]
    },
    {
        input: "assets/js/pedigree-chart/modules/storage.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart/pedigree-chart-storage.min.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve(),
            terser({
                mangle: true,
                compress: true,
                module: true,
                output: {
                    comments: false
                }
            })
        ]
    },

    // descendants-chart.js
    {
        input: "assets/js/descendants-chart/modules/index.js",
        output: [
            {
                name: "WebtreesDescendantsChart",
                file: "assets/js/descendants-chart/descendants-chart.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve()
        ]
    },
    {
        input: "assets/js/descendants-chart/modules/index.js",
        output: [
            {
                name: "WebtreesDescendantsChart",
                file: "assets/js/descendants-chart/descendants-chart.min.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve(),
            terser({
                mangle: true,
                compress: true,
                module: true,
                output: {
                    comments: false
                }
            })
        ]
    },

    // descendants-chart-storage.js
    {
        input: "assets/js/descendants-chart/modules/storage.js",
        output: [
            {
                name: "WebtreesDescendantsChart",
                file: "assets/js/descendants-chart/descendants-chart-storage.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve()
        ]
    },
    {
        input: "assets/js/descendants-chart/modules/storage.js",
        output: [
            {
                name: "WebtreesDescendantsChart",
                file: "assets/js/descendants-chart/descendants-chart-storage.min.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve(),
            terser({
                mangle: true,
                compress: true,
                module: true,
                output: {
                    comments: false
                }
            })
        ]
    }
];
