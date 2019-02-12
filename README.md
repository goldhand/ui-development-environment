UI Development Environment
==========================

# Structure

```
project-name
├── Config
├── package.json
├── README.md
├── webpack.config.js
├── src
│   ├── components
│   │   └── HelloWorld.js
│   ├── App.js
│   ├── render.js
│   └── index.js
├── assets
│   └── favicon.ico
├── dist
├── node_modules
└── build
```


# Steps

1. Setup npm package

```
npm init -y
```
files:
  * `.gitignore`
  * `README.md`
  * `Config` < TODO

```
git init
git add .
git commit -m '🎉 Init'
```

2. Setup babel
```
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react
npm install --save @babel/polyfill
```

configure `package.json#babel`:
```json
"babel": {
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ]
}
```


3. Setup linting

```
npm install -D eslint babel-eslint eslint-plugin-react eslint-plugin-import prettier eslint-plugin-prettier eslint-config-prettier
```

configure `package.json#eslintConfig`:
```json

"eslintConfig": {
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 2019,
    "sourceType": "module",
    "ecmaFeatures": {
      "impliedStrict": true,
      "jsx": true,
    }
  },
  "overrides": [
    {
      "files": [
        "**\/__tests__\/**\/*.js?(x)",
        "**\/?(*.)+(spec|test).js?(x)"
      ],
      "env": {
        "jest": true
      }
    }, {
      "files": [
        "**\/configs\/**\/*.js?",
      ],
      "env": {
        "node": true
      }
    }
  ]
}
```
"env": {
  "node": true,
  "browser": true
},

prettier:
https://prettier.io/docs/en/options.html

```json
"prettier": {
  "printWidth": 80,
}

```


Validate 2:
make a component file to check if it's working

```
touch -p src/index.js

const foo = (bar) => bar; // no-unused-vars,prettier/arrow-parens
```


3. webpack

```
npm install --save-dev webpack webpack-cli html-webpack-plugin clean-webpack-plugin
npm install --save @babel/polyfill
```


Validate webpack with a module:

```js
// touch -p src/render.js

/* eslint-env browser */
const render = () => {
  const app = document.createElement("div");
  app.innerHTML = "Hello World";
  document.body.appendChild(app);
};

render();
```

```js
// webpack.config.js

/* eslint-env node */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");

const OUT_DIR = "dist";

module.exports = {
  entry: {
    polyfills: "@babel/polyfill",
    main: "./src/render.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, OUT_DIR)
  },
  plugins: [new CleanWebpackPlugin([OUT_DIR]), new HtmlWebpackPlugin()]
};
```


4. webpack-dev-server

```
npm install --save-dev webpack-dev-server
```

```js
// webpack.config.js
/* eslint-env node */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const config = {
  entry: {
    polyfills: "@babel/polyfill",
    main: "./src/render.js"
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new HtmlWebpackPlugin({ favicon: "assets/favicon.ico" })
  ]
};

module.exports = (env = {}) => {
  if (env.development) {
    config.mode = "development";
    config.devtool = "inline-source-map";
    config.devServer = {
      contentBase: "./assets",
      hot: true
    };
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  }
  if (env.production) {
    config.mode = "production";
  }
  return config;
};
```


```js
// touch -p src/App.js

/* eslint-env browser */

const App = () => {
  const app = document.createElement("div");
  app.innerHTML = "Hello World";
  return app;
};

export default App;
```

```js
// src/render.js

/* eslint-env browser,commonjs */
import App from "./App";

const mountPoint = document.createElement("div");
document.body.appendChild(mountPoint);

let app = App();
mountPoint.appendChild(app);

if (module && module.hot) {
  module.hot.accept("./App.js", function() {
    mountPoint.removeChild(app);
    app = App();
    mountPoint.appendChild(app);
  });
}
```

5. storybook



6. jest



7. rest api



8. graphql


9. integration





```json
"eslintConfig": {
  "extends": "react-app"
},
"browserslist": [
  ">0.2%",
  "not dead",
  "not ie <= 11",
  "not op_mini all"
],
"jest": {
  "collectCoverageFrom": [
    "src/**/*.{js,jsx,ts,tsx}",
    "!src/**/*.d.ts"
  ],
  "resolver": "jest-pnp-resolver",
  "setupFiles": [
    "react-app-polyfill/jsdom"
  ],
  "testMatch": [
    "<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}",
    "<rootDir>/src/**/?(*.)(spec|test).{js,jsx,ts,tsx}"
  ],
  "testEnvironment": "jsdom",
  "testURL": "http://localhost",
  "transform": {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
    "^.+\\.css$": "<rootDir>/config/jest/cssTransform.js",
    "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)": "<rootDir>/config/jest/fileTransform.js"
  },
  "transformIgnorePatterns": [
    "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
    "^.+\\.module\\.(css|sass|scss)$"
  ],
  "moduleNameMapper": {
    "^react-native$": "react-native-web",
    "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
  },
  "moduleFileExtensions": [
    "web.js",
    "js",
    "web.ts",
    "ts",
    "web.tsx",
    "tsx",
    "json",
    "web.jsx",
    "jsx",
    "node"
  ],
  "watchPlugins": [
    "/Users/wfarley/projects/ui-development-environment/workspace/example-cra/node_modules/jest-watch-typeahead/filename.js",
    "/Users/wfarley/projects/ui-development-environment/workspace/example-cra/node_modules/jest-watch-typeahead/testname.js"
  ]
},
"babel": {
  "presets": [
    "react-app"
  ]
}

```
