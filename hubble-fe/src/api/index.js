/*
 * @Author: your name
 * @Date: 2022-01-08 16:46:27
 * @LastEditTime: 2022-01-14 14:06:39
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /hubble-fe/src/api/index.js
 */
/**
 * 网络请求配置
 */
import axios from 'axios';
import { message } from 'antd';
import storageFn from '../utils/storage'
import qs from 'qs';
// cookie.split(';').forEach(item => {
//     document.cookie = item.trim();
// });
// axios.defaults.baseURL = 'http://yq01-esm-bu-esm35.yq01.baidu.com:8666/baseline/web';
const instance = axios.create({
    baseURL: `/api/v1.3`,
    // baseURL: '/api/v1.3',
    withCredentials: true,
    timeout: 60000
});
/**
 * http request 拦截器
 */
instance.interceptors.request.use(
    (config) => {
        if (!config.headers['Content-Type']) {
            config.data = JSON.stringify(config.data);
            config.headers = {
                'Content-Type': 'application/json'
            };
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * http response 拦截器
 */
instance.interceptors.response.use(
    (response) => {
        if (response.data.status !== 200 && response.data.status !== 401) {
            message.error(response.data.message);
        } else if (response.data.status === 401) {
            message.error("授权过期");
            storageFn.removeStorage(['lg','userInfo','tenant'])
            setTimeout(() => {
                window.location.reload()
            }, 700);
        }
        return response;
    },
    (error) => {
        message.error('请求出错：', error);
    }
);

/**
 * 封装get方法
 * @param url  请求url
 * @param params  请求参数
 * @returns {Promise}
 */
const get = (url, params = {}) => {
    return new Promise((resolve, reject) => {
        instance.get(url, {
                params: params,
            }).then((response) => {
                resolve(response ? response.data : {});
            })
            .catch((error) => {
                reject(error);
            });
    });
};

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
const post = (url, data) => {
    return new Promise((resolve, reject) => {
        instance.post(url, data).then(
            (response) => {
                resolve(response ? response.data : {});
            },
            (err) => {
                reject(err);
            }
        );
    });
};

const put = (url, data) => {
    return new Promise((resolve, reject) => {
        instance.put(url, data).then(
            (response) => {
                resolve(response ? response.data : {});
            },
            (err) => {
                reject(err);
            }
        );
    });
};

const myDelete = (url, data) => {
    return new Promise((resolve, reject) => {
        instance.delete(url, data).then(
            (response) => {
                resolve(response ? response.data : {});
            },
            (err) => {
                reject(err);
            }
        );
    });
};

const postForm = (url, data) => {
    return new Promise((resolve, reject) => {
        const header = { headers: { 'Content-Type': 'application/x-www-form-urlencoded;' } };
        instance.post(url, qs.stringify(data), header).then(
            (response) => {
                resolve(response ? response.data : {});
            },
            (err) => {
                reject(err);
            }
        );
    });
}
const myaxios = {
    baseURL: instance.defaults.baseURL,
    post: post,
    get: get,
    put: put,
    postForm: postForm,
    delete: myDelete,
};

export default myaxios;
