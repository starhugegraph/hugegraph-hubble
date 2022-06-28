import request from './request';

export const WAITING_CODE = 0;
export const UPLOADING_CODE = 1;
export const SUCCESS_CODE = 2;
export const UPLOAD_ERROR_CODE = 3;
export const TYPE_ERROR_CODE = 4;
export const SIZE_ERROR_CODE = 5;
export const RUN_ERROR_CODE = 6;
export const FILE_ERROR_CODE = 7;
export const TIMEOUT_ERROR_CODE = 8;

export const UPLOAD_STATUS_MAP = {
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

export const originStatus = {
    WAITING: 'waiting',
    UPLOADING: 'uploading',
    SUCCESS: 'success',
    ERROR: 'error'
};

export const checkIsFile = opts => {
    return !opts.file || Object.prototype.toString.call(opts.file) !== '[object File]';
};

export const checkFileType = opts => {
    const accept = (opts.options && Array.isArray(opts.options.accept)) ? opts.options.accept : [];
    return accept.indexOf(opts.file.type) === -1 && accept.indexOf('*') === -1;
};

export const checkFileSize = opts => {
    return opts.file && opts.file.size > opts.options.maxSize;
};

export const RULE_TYPE = {
    HANG: 'hang',
    FILE: 'file',
    TYPE: 'type',
    SIZE: 'size'
};

export const checkFileRules = {
    [RULE_TYPE.FILE]: {
        match: checkIsFile,
        error: UPLOAD_STATUS_MAP.FILE_ERROR,
        type: RULE_TYPE.FILE
    },
    [RULE_TYPE.TYPE]: {
        match: checkFileType,
        error: UPLOAD_STATUS_MAP.TYPE_ERROR,
        type: RULE_TYPE.TYPE
    },
    [RULE_TYPE.SIZE]: {
        match: checkFileSize,
        error: UPLOAD_STATUS_MAP.SIZE_ERROR,
        type: RULE_TYPE.SIZE
    }
};

export const getBase64 = file => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise((resolve, reject) => {
        reader.onload = () => {
            const reg = /^data:.*base64,/;
            const withoutPrefixList = reader.result.replace(reg, '');
            resolve(withoutPrefixList);
        };
        reader.onerror = error => {
            reject(error);
        };
        reader.onabort = error => {
            reject(error);
        };
    });
};

export const fileUploader = fileObj => {
    request(fileObj);
};

export const getUid = (index = 0) => {
    const now = +(new Date());
    return `new-one-fc-${now}-${index}`;
};
