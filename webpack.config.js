const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = path.resolve(__dirname, "build");
const srcPath = path.resolve(__dirname, "src");

module.exports = {
    entry: {
        index: [
            path.join(srcPath, "index.js"),
            path.join(srcPath, "styles", "style.scss")
        ]
    },
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(srcPath, "index.html")
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
            },
            {
                test: /\.jsx?/,
                use: "babel-loader"
            },
            {
                test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
                type: "asset/inline"
            },
        ]
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    devServer: {
        host: "localhost",
        port: 3000,
        hot: true
    }
};