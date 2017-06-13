var Generator = require('yeoman-generator');
var path = require('path');
var fs = require('fs');
var objectAssignDeep = require('object-assign-deep');
var mkdirp = require('mkdirp-promise');

var sharedPackage = require('./templates/package');
var aureliaPackage = require('./templates/aurelia/package');
var reactPackage = require('./templates/react/package');
var sharedTsConfig = require('./templates/tsconfig');
var aureliaTsConfig = require('./templates/aurelia/tsconfig');
var reactTsConfig = require('./templates/react/tsconfig');

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts);

        this.option('react');
        this.option('aurelia');
        this.option('typescript');
    }

    prompts() {
        return this.prompt([{
            type: "input",
            name: "SourceDir",
            message: "Directory location of prebuilt client source code.",
            default: "./ClientApp"
        }, {
            type: "input",
            name: "EntryFile",
            message: "Entry JS file. (dont include extension).",
            default: "boot"
        }, {
            type: "input",
            name: "BuildDir",
            message: "Location of built source code.",
            default: "./wwwroot/dist"
        }, {
            type: "input",
            name: "PublicPath",
            message: "Location of web accessible static resources.",
            default: "/dist"
        }]).then(ans => {
            var ext = this.options.typescript ? '.ts' : '.js';
            ext = this.options.react ? ext + 'x' : ext;
            var tempExt = path.extname(path.join(this.destinationPath(ans.SourceDir), ans.EntryFile));
            ext = tempExt != '' ? '' : ext;

            this.sourceDir = ans.SourceDir;
            this.entryFile = ans.EntryFile + ext;
            this.buildDir = ans.BuildDir;
            this.publicPath = ans.PublicPath
        });
    }

    packageJson() {
        var packagePath = this.destinationPath('package.json');
        var packageObj = JSON.parse(this.fs.read(packagePath, { defaults: '{}' }));
        packageObj = objectAssignDeep(packageObj, sharedPackage);
        if(this.options.aurelia) {
            packageObj = objectAssignDeep(aureliaPackage, packageObj);
        } else if (this.options.react) {
            packageObj = objectAssignDeep(reactPackage, packageObj);
        }

        this.fs.write(packagePath, JSON.stringify(packageObj, null, '\t'));
    }

    installPackages() {
        if(!this.options["skip-install"]) {
            return this.npmInstall();
        }
        return;
    }

    tsConfig() {
        if(this.options.typescript) {
            var tsConfigPath = this.destinationPath('tsconfig.json');
            var tsConfigObj = JSON.parse(this.fs.read(tsConfigPath, { defaults: '{}' }));
            if(this.options.aurelia) {
                tsConfigObj = objectAssignDeep(sharedTsConfig, aureliaTsConfig, tsConfigObj);
            } else if (this.options.react) {
                tsConfigObj = objectAssignDeep(sharedTsConfig, reactTsConfig, tsConfigObj);
            }

            this.fs.write(tsConfigPath, JSON.stringify(tsConfigObj, null, '\t'));
        }
    }

    webpackConfigVendor() {
        var webpackVendorPath = this.templatePath('webpack.config.vendor.js');

        if(this.options.aurelia) {
            webpackVendorPath = this.templatePath('aurelia/webpack.config.vendor.js');
        } else if (this.options.react) {
            webpackVendorPath = this.templatePath('react/webpack.config.vendor.js');
        }

        this.fs.copyTpl(
            webpackVendorPath,
            this.destinationPath('webpack.config.vendor.js'),
            {
                buildDir: this.buildDir
            }
        );

    }

    webpackConfig() {

        // if(this.options.aurelia) {
            this.fs.copyTpl(
                this.templatePath('webpack.config.js'),
                this.destinationPath('webpack.config.js'),
                {
                    useAurelia: this.options.aurelia,
                    buildDir: this.buildDir,
                    sourceDir: this.sourceDir,
                    publicPath: this.publicPath,
                    entryFile: this.entryFile
                }
            );
        // }

    }

    createSourceDir() {
        const source = this.destinationPath(this.sourceDir);
        if(!fs.existsSync(source)) {
            return mkdirp(source);
        }
        return;
    }

    copyResources() {
        const sourceDir = this.destinationPath(this.sourceDir);
        var resources = path.join(this.templatePath('default-app/ES6/ClientApp'), '**');
        var bootFile = this.templatePath('default-app/ES6/boot.js');
        var ext = '.js';

        if(this.options.typescript) {
            resources = path.join(this.templatePath('default-app/TypeScript/ClientApp'), '**');
            bootFile = this.templatePath('default-app/TypeScript/boot.ts');
            ext = '.ts';
        }
        
        if(this.options.aurelia) {
            if(this.options.typescript) {
                resources = path.join(this.templatePath('aurelia/TypeScript/ClientApp'), '**');
                bootFile = this.templatePath('aurelia/TypeScript/boot.ts');
            } else {
                resources = path.join(this.templatePath('aurelia/ES6/ClientApp'), '**');
                bootFile = this.templatePath('aurelia/ES6/boot.js');
            }
        }

        if(this.options.react) {
            if(this.options.typescript) {
                resources = path.join(this.templatePath('react/TypeScript/ClientApp'), '**');
                bootFile = this.templatePath('react/TypeScript/boot.tsx');
            } else {
                resources = path.join(this.templatePath('react/ES6/ClientApp'), '**');
                bootFile = this.templatePath('react/ES6/boot.jsx');
            }
        }

        const tempExt = path.extname(path.join(sourceDir, this.entryFile));
        ext = tempExt != '' ? '' : ext;

        this.fs.copy(resources, sourceDir);
        this.fs.copy(bootFile, path.join(sourceDir, this.entryFile + ext));

    }

};