module.exports = {
  "compilerOptions": {
    "moduleResolution": "node",
    "target": "es5",
    "sourceMap": true,
    "skipDefaultLibCheck": true,
    "lib": [ "es6", "dom" ],
    "types": [ "node" ]
  },
  "exclude": [ "bin", "node_modules" ],
  "atom": { "rewriteTsconfig": false }
};