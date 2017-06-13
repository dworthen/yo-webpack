module.exports = {
    "scripts": {
        "build:vendor:dev": "webpack --config webpack.config.vendor.js",
        "build:app:dev": "webpack",
        "build:all:dev": "npm run build:vendor:dev && npm run build:app:dev",
        "build:vendor:prod": "webpack --config webpack.config.vendor.js --env.prod",
        "build:app:prod": "webpack --env.prod",
        "build:all:prod": "npm run build:vendor:dev -- --env.prod && npm run build:app:dev -- --env.prod"
    },
    "dependencies": {
        "bootstrap": "^3.3.7",
        "jquery": "^3.2.1",
        "isomorphic-fetch": "^2.2.1"
    },
    "devDependencies": {
        "@types/node": "^6.0.78",
        "aspnet-webpack": "^1.0.28",
        "aurelia-webpack-plugin": "^2.0.0-rc.2",
        "babel-core": "*",
        "babel-loader": "*",
        "babel-preset-env": "*",
        "babel-preset-react": "*",
        "babel-plugin-transform-decorators-legacy": "*",
        "css-loader": "^0.28.0",
        "extract-text-webpack-plugin": "^2.1.0",
        "file-loader": "^0.11.1",
        "html-loader": "^0.4.5",
        "json-loader": "^0.5.4",
        "style-loader": "^0.16.1",
        "ts-loader": "^2.0.3",
        "typescript": "^2.2.2",
        "url-loader": "^0.5.8",
        "webpack": "^2.3.3",
        "webpack-hot-middleware": "^2.18.0"
    }
}