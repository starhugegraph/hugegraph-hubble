{
  "name": "@baidu/one-ui-icon",
  "version": "0.0.0",
  "description": "OneUI图标库",
  "main": "cjs/index.js",
  "module": "es/index.js",
  "scripts": {
    "build": "node rollup.js"
  },
  "repository": {
    "type": "git",
    "url": "http://icode.baidu.com/repo/baidu%2Fet%2Fee-icon"
  },
  "keywords": [
    "icon",
    "svg",
    "ui",
    "ee"
  ],
  "author": "zhanglili01,huoyuxuan,lisiqi06",
  "license": "MIT",
  "homepage": "http://icode.baidu.com/repo/baidu%2Fet%2Fee-icon",
  "files": [
    "cjs",
    "es",
    "lib",
    "metas",
    "materials",
    "package.tpl",
    "CHANGELOG.md",
    "npm-shrinkwrap.json",
    "rollup.js"
  ],
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/plugin-proposal-class-properties": "^7.0.0",
    "@babel/plugin-proposal-decorators": "^7.0.0",
    "@babel/plugin-proposal-do-expressions": "^7.0.0",
    "@babel/plugin-proposal-export-default-from": "^7.0.0",
    "@babel/plugin-proposal-export-namespace-from": "^7.0.0",
    "@babel/plugin-proposal-function-sent": "^7.0.0",
    "@babel/plugin-proposal-json-strings": "^7.0.0",
    "@babel/plugin-proposal-logical-assignment-operators": "^7.0.0",
    "@babel/plugin-proposal-nullish-coalescing-operator": "^7.0.0",
    "@babel/plugin-proposal-numeric-separator": "^7.0.0",
    "@babel/plugin-proposal-optional-chaining": "^7.0.0",
    "@babel/plugin-proposal-pipeline-operator": "^7.0.0",
    "@babel/plugin-proposal-throw-expressions": "^7.0.0",
    "@babel/plugin-syntax-dynamic-import": "^7.0.0",
    "@babel/plugin-syntax-import-meta": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "@babel/preset-react": "^7.0.0",
    "babel-loader": "^8.0.0",
    "babel-plugin-react-require": "^3.0.0",
    "babel-plugin-react-transform": "^3.0.0",
    "css-loader": "^1.0.0",
    "react": "^16.4.1",
    "rollup": "^1.12.3",
    "rollup-plugin-auto-external": "^2.0.0",
    "rollup-plugin-babel": "^4.3.2",
    "rollup-plugin-node-resolve": "^5.0.0",
    "rollup-plugin-postcss": "^2.0.3",
    "rollup-plugin-svg-to-jsx": "^1.0.0",
    "style-loader": "^0.21.0",
    "svg-react-loader": "^0.4.5",
    "uglifyjs-webpack-plugin": "^1.3.0",
    "url-loader": "^1.0.1"
  },
  "peerDependencies": {
    "react": ">=16"
  }
}
