function getError(option, xhr) {
    const msg = `cannot ${option.method} ${option.action} ${xhr.status}'`;
    const err = new Error(msg);
    err.status = xhr.status;
    err.method = option.method;
    err.url = option.action;
    return err;
}

function getBody(xhr) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

// option {
//  正在进行中
//  onProgress: (event: { percent: number }): void,
//  错误
//  onError: (event: Error, body?: Object): void,
//  成功
//  onSuccess: (body: Object): void,
//  请求参数
//  reqParams: Object,
//  文件名
//  filename: String,
//  文件
//  file: File,
//  上传请求时是否携带 cookie
//  withCredentials: Boolean,
//  上传ajax的url
//  action: String,
//  设置上传的请求头部，IE10 以上有效
//  headers: Object
//  其余的一些参数
//  reqData
// }
export default function upload(option) {
    const xhr = new XMLHttpRequest();

    if (option.onProgress && xhr.upload) {
        xhr.upload.onprogress = function progress(e) {
            if (e.total > 0) {
                e.percent = e.loaded / e.total * 100;
            }
            option.onProgress(e);
        };
    }

    const formData = new FormData();

    if (option.reqData) {
        Object.keys(option.reqData).forEach(key => {
            formData.append(key, option.reqData[key]);
        });
    }

    formData.append(option.filename, option.file);

    xhr.onerror = function error(e) {
        option.onError(e);
    };

    xhr.onload = function onload() {
        // allow success when 2xx status
        // see https://github.com/react-component/upload/issues/34
        if (xhr.status < 200 || xhr.status >= 300) {
            return option.onError(getError(option, xhr), getBody(xhr));
        }

        option.onSuccess(getBody(xhr), xhr);
    };


    xhr.open(option.method, option.action, true);

    if (option.withCredentials && 'withCredentials' in xhr) {
        xhr.withCredentials = true;
    }

    const headers = option.headers || {};

    if (headers['X-Requested-With'] !== null) {
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const h in headers) {
        // eslint-disable-next-line no-prototype-builtins
        if (headers.hasOwnProperty(h) && headers[h] !== null) {
            xhr.setRequestHeader(h, headers[h]);
        }
    }
    xhr.send(formData);

    return {
        abort() {
            xhr.abort();
        }
    };
}
