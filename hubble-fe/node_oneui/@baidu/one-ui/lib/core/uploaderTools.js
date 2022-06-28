"use strict";

exports.__esModule = true;
exports.getUid = exports.fileUploader = exports.getBase64 = exports.checkFileRules = exports.RULE_TYPE = exports.checkFileSize = exports.checkFileType = exports.checkIsFile = exports.originStatus = exports.UPLOAD_STATUS_MAP = exports.TIMEOUT_ERROR_CODE = exports.FILE_ERROR_CODE = exports.RUN_ERROR_CODE = exports.SIZE_ERROR_CODE = exports.TYPE_ERROR_CODE = exports.UPLOAD_ERROR_CODE = exports.SUCCESS_CODE = exports.UPLOADING_CODE = exports.WAITING_CODE = void 0;

var _request = _interopRequireDefault(require("./request"));

var _checkFileRules;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var WAITING_CODE = 0;
exports.WAITING_CODE = WAITING_CODE;
var UPLOADING_CODE = 1;
exports.UPLOADING_CODE = UPLOADING_CODE;
var SUCCESS_CODE = 2;
exports.SUCCESS_CODE = SUCCESS_CODE;
var UPLOAD_ERROR_CODE = 3;
exports.UPLOAD_ERROR_CODE = UPLOAD_ERROR_CODE;
var TYPE_ERROR_CODE = 4;
exports.TYPE_ERROR_CODE = TYPE_ERROR_CODE;
var SIZE_ERROR_CODE = 5;
exports.SIZE_ERROR_CODE = SIZE_ERROR_CODE;
var RUN_ERROR_CODE = 6;
exports.RUN_ERROR_CODE = RUN_ERROR_CODE;
var FILE_ERROR_CODE = 7;
exports.FILE_ERROR_CODE = FILE_ERROR_CODE;
var TIMEOUT_ERROR_CODE = 8;
exports.TIMEOUT_ERROR_CODE = TIMEOUT_ERROR_CODE;
var UPLOAD_STATUS_MAP = {
  WAITING: {
    code: WAITING_CODE,
    status: 'waiting'
  },
  UPLOADING: {
    code: UPLOADING_CODE,
    status: 'pendding'
  },
  SUCCESS: {
    code: SUCCESS_CODE,
    status: 'success'
  },
  UPLOAD_ERROR: {
    code: UPLOAD_ERROR_CODE,
    status: 'error',
    error: {
      msg: '上传失败，请重试'
    }
  },
  TYPE_ERROR: {
    code: TYPE_ERROR_CODE,
    status: 'error',
    error: {
      msg: '文件格式不符合要求'
    }
  },
  SIZE_ERROR: {
    code: SIZE_ERROR_CODE,
    status: 'error',
    error: {
      msg: '文件大小不符合要求'
    }
  },
  RUN_ERROR: {
    code: RUN_ERROR_CODE,
    status: 'error',
    error: {
      msg: '运行错误'
    }
  },
  FILE_ERROR: {
    code: FILE_ERROR_CODE,
    status: 'error',
    error: {
      msg: '上传的不是指定文件类型，请重试'
    }
  },
  TIMEOUT_ERROR: {
    code: TIMEOUT_ERROR_CODE,
    status: 'error',
    error: {
      msg: '上传超时，请重试'
    }
  }
};
exports.UPLOAD_STATUS_MAP = UPLOAD_STATUS_MAP;
var originStatus = {
  WAITING: 'waiting',
  UPLOADING: 'uploading',
  SUCCESS: 'success',
  ERROR: 'error'
};
exports.originStatus = originStatus;

var checkIsFile = function checkIsFile(opts) {
  return !opts.file || Object.prototype.toString.call(opts.file) !== '[object File]';
};

exports.checkIsFile = checkIsFile;

var checkFileType = function checkFileType(opts) {
  var accept = opts.options && Array.isArray(opts.options.accept) ? opts.options.accept : [];
  return accept.indexOf(opts.file.type) === -1 && accept.indexOf('*') === -1;
};

exports.checkFileType = checkFileType;

var checkFileSize = function checkFileSize(opts) {
  return opts.file && opts.file.size > opts.options.maxSize;
};

exports.checkFileSize = checkFileSize;
var RULE_TYPE = {
  HANG: 'hang',
  FILE: 'file',
  TYPE: 'type',
  SIZE: 'size'
};
exports.RULE_TYPE = RULE_TYPE;
var checkFileRules = (_checkFileRules = {}, _checkFileRules[RULE_TYPE.FILE] = {
  match: checkIsFile,
  error: UPLOAD_STATUS_MAP.FILE_ERROR,
  type: RULE_TYPE.FILE
}, _checkFileRules[RULE_TYPE.TYPE] = {
  match: checkFileType,
  error: UPLOAD_STATUS_MAP.TYPE_ERROR,
  type: RULE_TYPE.TYPE
}, _checkFileRules[RULE_TYPE.SIZE] = {
  match: checkFileSize,
  error: UPLOAD_STATUS_MAP.SIZE_ERROR,
  type: RULE_TYPE.SIZE
}, _checkFileRules);
exports.checkFileRules = checkFileRules;

var getBase64 = function getBase64(file) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  return new Promise(function (resolve, reject) {
    reader.onload = function () {
      var reg = /^data:.*base64,/;
      var withoutPrefixList = reader.result.replace(reg, '');
      resolve(withoutPrefixList);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.onabort = function (error) {
      reject(error);
    };
  });
};

exports.getBase64 = getBase64;

var fileUploader = function fileUploader(fileObj) {
  (0, _request["default"])(fileObj);
};

exports.fileUploader = fileUploader;

var getUid = function getUid(index) {
  if (index === void 0) {
    index = 0;
  }

  var now = +new Date();
  return "new-one-fc-" + now + "-" + index;
};

exports.getUid = getUid;