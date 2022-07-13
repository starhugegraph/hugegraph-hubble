const {rollup} = require('rollup');
const babel = require('rollup-plugin-babel');
const svgToReact = require('rollup-plugin-svg-to-jsx');
const autoExternal = require('rollup-plugin-auto-external');
const resolve = require('rollup-plugin-node-resolve');
const css = require('rollup-plugin-postcss');

const babelConfig = {
    presets: [
        [
            '@babel/preset-env',
            {
                modules: false
            }
        ],
        '@babel/preset-react'
    ],
    plugins: [
        '@babel/plugin-proposal-export-default-from',
        'babel-plugin-react-require'
    ],
    exclude: 'node_modules/**',
    extensions: ['.js', '.svg'],
};

const main = async () => {
    const plugins= [
        resolve(),
        css(),
        svgToReact(),
        babel(babelConfig),
        autoExternal({dependencies: false})
    ];

    const inputOptions = {
        context: __dirname,
        input: 'lib/svg.js',
        plugins: plugins
    };

    const bundle = await rollup(inputOptions);
    bundle.write({format: 'cjs', file: 'cjs/index.js', sourcemap: true, banner: '/* eslint-disable */'});
    bundle.write({format: 'es', file: 'es/index.js', sourcemap: true, banner: '/* eslint-disable */'});
};

main();
