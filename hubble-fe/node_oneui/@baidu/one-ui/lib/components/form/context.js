"use strict";

exports.__esModule = true;
exports.FormContext = void 0;

var _createReactContext = _interopRequireDefault(require("create-react-context"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var FormContext = (0, _createReactContext["default"])({
  labelAlign: 'right',
  vertical: false
});
exports.FormContext = FormContext;