# Aurelia and React Templates

## Prerequisites

1. Install yo globally with npm (or ensure it is up to date) `npm install yo -g`
2. Download this project using git
3. Install globally `cd projectFolder && npm link`. This exposes a webpack template for yo.

## Usage

```
yo webpack --help
```

This command works with existing projects. Run `npm init` to add a package.json file to the web project if one does not exist.

Supports both `--react` and `--aurelia` frameworks. Running `yo webpack` without any framework specific flags will scaffold out an empty JS application. All templates support ES6 syntax.

The command prompts for a source directory, build directory, public directory and an entry file point. The defaults used are standard for ASP.NET core web projects.

- Source directory: `ClientApp`
- Build directory: `wwwroot/dist`
- Entry file: `boot` (file extension is determined by the use of flags provided to the command). This is the file that launches (bootstraps) the JS application and will reside in the source directory
- Public directory: `dist`. The web accessible path where static resources, including the built JS app, are located. 

### Examples

__React + Typescript__

```
yo webpack --react --typescript
```

__Aurelia__

```
yo webpack --aurelia
```

__Plain JS application. Minimal application structure provided__

```
yo webpack
```

### Outcome

Generates `webpack.config.vendor.js` and `webpack.config.js` files and a JS application structure in the provided source directory. New dependencies and build scripts are added to the project's package.json. 

The framework specific flags, `--react` and `aurelia`, and the language specific flag, `--typescript`, deteremine the intitial file and folder structure scaffolded to the source directory but do not impact the technologies supported. Instead, webpack builds based on file extension. `.ts` and `.tsx` (TypeScript + JSX) files are processed by the typescript transpiler, `.jsx` by the JSX transpiler and `.js` by the babel ES6 transpiler. Any combination of TypeScript, JSX and ES6 may be used despite which flags were used during `yo webpack` setup.

### Building

The following build commands are added to the package.json file.

- `npm run build:vendor:dev` build the vendor specific dependencies to the build directory for dev mode (not compressed and contains source maps). 
- `npm run build:app:dev` build app specific code to build directory.
- `npm run build:all:dev` build both vendor and application JS code.
- The same commands for prod (compressed code with no source maps), example, `npm run build:all:prod`.

The `--watch` flag can be added to any of the build commands to automatically recompile on file change. Useful for local development. Example: `npm run build:vendor:dev && npm run build:app:dev -- --watch` builds vendor dependencies once and builds app code everytime a change occurs to any app code file.

Built code will reside in the specified build directory.

### Running

An example react app:

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="/dist/vendor.css">
    <link rel="stylesheet" href="/dist/site.css"> <!-- css file generated for react apps but not aurelia apps. -->
    
    <title>React App</title>
</head>
<body>

    <div id="react-app">Loading...</div>

    <script src="/dist/vendor.js"></script>
    <script src="/dist/app.js"></script>
    
</body>
</html>
```