// const webpack = require("webpack");
const path = require("path");
const fs = require("fs");
const pre = require("./webpack.preconfig");

// path ways for files.
const rootdir = path.resolve(__dirname);
// const srcdir = path.join(rootdir, "src");
const destdir = path.join(rootdir, "../dest/node");
const nodemodules = path.join(rootdir, "../node_modules");

const externs = {};

fs.readdirSync(path.join(nodemodules)).filter(function filterModules(x) {
    return [".bin"].indexOf(x) === -1;
}).forEach((x) => {
    externs[x] = {
        commonjs: x,
        commonjs2: x,
        amd: x,
        root: "_",
    };
});

// export new configuration for node.
module.exports = pre.Build({
    target: "node",
    output: {
        path: destdir,
        filename: "index.js",
        library: "starterkitjs",
        libraryTarget: "umd", // can also be 'window', 'this', 'var' see https://webpack.js.org/guides/author-libraries/.
    },
    module: {},
    externals: externs,
});