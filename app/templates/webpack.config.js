const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('site.css');
const AureliaPlugin = require('aurelia-webpack-plugin').AureliaPlugin;

const buildDir = '<%= buildDir %>';
const publicPath = '<%= publicPath %>';
const sourceDir = '<%= sourceDir %>';
const entryFile = '<%= entryFile %>'
const useAurelia = !!'<%= useAurelia %>';

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);
    const cssLoader = isDevBuild ? 'css-loader' : 'css-loader?minimize';
    return [{
        stats: { modules: false },
        entry: { 'app': useAurelia ? 'aurelia-bootstrapper' : entryFile },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx'],
            modules: [sourceDir, 'node_modules']
        },
        output: {
            path: path.resolve(buildDir),
            publicPath: publicPath,
            filename: '[name].js'
        },
        module: {
            rules: [
                { test: /\.tsx?$/i, include: path.resolve(sourceDir), use: 'ts-loader?silent=true' },
                { test: /\.jsx?$/i, include: path.resolve(sourceDir), 
                    use: { 
                        loader: 'babel-loader', 
                        options: { 
                            presets: ['react', 'env'],
                            plugins: ['transform-decorators-legacy']
                        }
                    } 
                },
                { test: /\.html$/i, use: 'html-loader' },
                { test: /\.css$/i, use: useAurelia ? cssLoader : extractCSS.extract([cssLoader]) },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
            extractCSS,
            new webpack.DefinePlugin({ IS_DEV_BUILD: JSON.stringify(isDevBuild) }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require(path.resolve(buildDir, 'vendor-manifest.json'))
            })
        ].concat(useAurelia ? [
            new AureliaPlugin({ aureliaApp: entryFile })
        ] : []).concat(isDevBuild ? [
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(buildDir, '[resourcePath]')  // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            new webpack.optimize.UglifyJsPlugin()
        ])
    }];
}
