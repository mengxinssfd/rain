const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isPublish = process.env.NODE_ENV === "publish";
const config = {
    mode: "development",
    // devtool: isDev ? "cheap-module-source-map" : "",
    entry: {
        index: "./src/index.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash:4].js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["babel-loader", "ts-loader"],
                exclude: [path.resolve(__dirname, "node_modules")],
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },

    plugins: [
        new HtmlPlugin({
            template: './index.html',
            filename: 'index.html',
            chunks: ['index'],// 于loader一样，在后面的会插到前面去
        })
    ],

    devServer: {
        // publicPath: '/',
        port: 8080,
    },
};
if (!isDev) {
    config.plugins.push(new CleanWebpackPlugin());
}
module.exports = config;