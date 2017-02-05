'use strict';

const path = require('path');

module.exports = {
    target: 'electron',
    node: {
        __dirname: false,
        __filename: false
    },
    entry: {
        'main': './src/main/main.ts',
        'index': './src/renderer/index.ts',
        'title': './src/renderer/title.ts'
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.ts', '.tsx']
    },
    module: {
        loaders: [{
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loaders: ['babel', 'ts']
        }]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    }
};
