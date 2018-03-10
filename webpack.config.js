const path = require("path");

module.exports = {
    resolve: {
        extensions: [".js", ".jsx"],
        alias: {
            src: path.resolve(__dirname, "src/js")
        }
    },
    mode: "development",
    entry: {
        app: ["./src/js/main.jsx"]
    },
    output: {
        path: path.resolve("./dist/static"),
        filename: "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [{ loader: "babel-loader" }],
                exclude: /node_modules/
            }
        ]
    }
};
//{ loader: "eslint-loader" }
