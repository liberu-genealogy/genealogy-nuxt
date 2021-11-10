import resolve from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";

export default [

    {
        input: "assets/js/modules/index.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve()
        ]
    },
    {
        input: "assets/js/modules/index.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart.min.js",
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
        input: "assets/js/modules/storage.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart-storage.js",
                format: "umd"
            }
        ],
        plugins: [
            resolve()
        ]
    },
    {
        input: "assets/js/modules/storage.js",
        output: [
            {
                name: "WebtreesPedigreeChart",
                file: "assets/js/pedigree-chart-storage.min.js",
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
