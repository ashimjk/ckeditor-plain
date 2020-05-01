'use strict';

const path = require('path');
const {styles} = require('@ckeditor/ckeditor5-dev-utils');
const TerserPlugin = require( 'terser-webpack-plugin' );

module.exports = {
    entry: path.resolve(__dirname, 'src', 'ckeditor.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ckeditor.js',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },

    optimization: {
        minimizer: [
            new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                    output: {
                        // Preserve CKEditor 5 license comments.
                        comments: /^!/
                    }
                },
                extractComments: false
            })
        ]
    },

    module: {
        rules: [
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                use: ['raw-loader']
            },
            {
                test: /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css$/,
                use: [
                    {
                        loader: 'style-loader',
                        options: {
                            injectType: 'singletonStyleTag'
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: styles.getPostCssConfig({
                            themeImporter: {
                                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
                            },
                            minify: true
                        })
                    }
                ]
            },
            {
                test: /placeholder+[/\\]theme[/\\].+\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    },
    devtool: 'source-map',
    performance: {hints: false}
};
