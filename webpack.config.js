const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const buildPath = path.resolve(__dirname, "build");
const srcPath = path.resolve(__dirname, "src");

module.exports = {
    entry: {
        index: [
            path.join(srcPath, "index.tsx"),
            path.join(srcPath, "styles", "style.scss")
        ]
    },
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            favicon: path.join(srcPath, "assets", "favicon.ico"),
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
                test: /\.[tj]sx?$/,
                use: "babel-loader"
            },
            {
                test: /\.(?:ico|png|jpg|jpeg|svg)$/i,
                type: "asset/inline"
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    devServer: {
        host: "127.0.0.1",
        port: 3000,
        hot: true
    }
};