var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var path = require("path");
module.exports = {
    entry: "./src/app.ts",
    output: {
        path: "./dist",
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ["", '.webpack.js', '.web.js', '.ts', '.js']
    },
    module: {
        loaders: [

            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }, {
                test: /\.css/,
                loader: ExtractTextPlugin.extract("css")
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: ['file?hash=sha512&digest=hex&name=[name].[ext]', 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false']
            }, {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/font-woff"
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.cur(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=application/octet-stream"
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: "file"
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: "url?limit=10000&mimetype=image/svg+xml"
            }
        ]
    },
    plugins: [new ExtractTextPlugin("styles.css"), new CopyWebpackPlugin([
        { from: './index.html', to: './../dist/index.html' },
        { from: './assets', to: './../dist/assets' }])]
}
