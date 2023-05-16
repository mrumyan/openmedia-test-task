const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const buildPath = path.resolve(__dirname, "build");
const srcPath = path.resolve(__dirname, "src");

module.exports = {
    entry: path.join(srcPath, "index.js"),
    output: {
        path: buildPath,
        filename: "bundle.js"
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: path.join(srcPath, "index.html")
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    devServer: {
        host: "localhost",
        port: 3000,
        hot: true
    }
};