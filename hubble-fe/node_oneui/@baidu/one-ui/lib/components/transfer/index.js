"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _transfer = _interopRequireWildcard(require("./transfer"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/**
 * @file 地域组件
 * @author huangshiming
 */
_transfer["default"].CommonTitleRender = _transfer.CommonTitleRender;
_transfer["default"].CommonItemRender = _transfer.CommonItemRender;
_transfer["default"].CommonSearchRender = _transfer.CommonSearchRender;
_transfer["default"].CommonFooterRender = _transfer.CommonFooterRender;
var _default = _transfer["default"];
exports["default"] = _default;
module.exports = exports.default;