var _checkFileRules;

import request from './request';
export var WAITING_CODE = 0;
export var UPLOADING_CODE = 1;
export var SUCCESS_CODE = 2;
export var UPLOAD_ERROR_CODE = 3;
export var TYPE_ERROR_CODE = 4;
export var SIZE_ERROR_CODE = 5;
export var RUN_ERROR_CODE = 6;
export var FILE_ERROR_CODE = 7;
export var TIMEOUT_ERROR_CODE = 8;
export var UPLOAD_STATUS_MAP = {
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
export var originStatus = {
  WAITING: 'waiting',
  UPLOADING: 'uploading',
  SUCCESS: 'success',
  ERROR: 'error'
};
export var checkIsFile = function checkIsFile(opts) {
  return !opts.file || Object.prototype.toString.call(opts.file) !== '[object File]';
};
export var checkFileType = function checkFileType(opts) {
  var accept = opts.options && Array.isArray(opts.options.accept) ? opts.options.accept : [];
  return accept.indexOf(opts.file.type) === -1 && accept.indexOf('*') === -1;
};
export var checkFileSize = function checkFileSize(opts) {
  return opts.file && opts.file.size > opts.options.maxSize;
};
export var RULE_TYPE = {
  HANG: 'hang',
  FILE: 'file',
  TYPE: 'type',
  SIZE: 'size'
};
export var checkFileRules = (_checkFileRules = {}, _checkFileRules[RULE_TYPE.FILE] = {
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
export var getBase64 = function getBase64(file) {
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
export var fileUploader = function fileUploader(fileObj) {
  request(fileObj);
};
export var getUid = function getUid(index) {
  if (index === void 0) {
    index = 0;
  }

  var now = +new Date();
  return "new-one-fc-" + now + "-" + index;
};