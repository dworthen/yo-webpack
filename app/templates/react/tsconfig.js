module.exports = {
  "compilerOptions": {
    "baseUrl": ".",
    "jsx": "react",
    "types": [ "webpack-env" ],
    "paths": {
      // Fix "Duplicate identifier" errors caused by multiple dependencies fetching their own copies of type definitions.
      // We tell TypeScript which type definitions module to treat as the canonical one (instead of combining all of them).
      "history": ["./node_modules/@types/history/index"],
      "react": ["./node_modules/@types/react/index"]
    }
  }
};