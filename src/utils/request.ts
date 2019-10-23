/*
 * @文件描述: HTTP请求封装
 * @公司: thundersdata
 * @作者: 陈杰
 * @LastEditors: 陈杰
 * @Date: 2019-04-07 14:46:34
 * @LastEditTime: 2019-10-18 14:44:36
 */
import * as qs from 'qs';
import Axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { AjaxResponse, AuthResponse } from './type';
import { getToken } from './auth';

function handleSuccess(response: AxiosResponse) {
  return response.data;
}

/**
 * 异常处理函数
 * @param error
 */
function handleError(error: AxiosError) {
  const { response, message } = error;
  let errorMsg = '';
  if (response) {
    switch (response.status) {
      case 400:
        errorMsg = response.data ? response.data.msg : '';
        break;
      case 500:
      case 501:
      case 502:
        errorMsg = response.data ? response.data.msg : '服务器内部错误';
        break;
    }
    return Promise.reject({
      code: response.status,
      success: false,
      data: null,
      message: errorMsg,
    });
  } else if (message === 'cancel') {
    // 频繁操作时会有这个问题
    return Promise.reject({
      code: 50000,
      success: false,
      message,
    });
  }
  return Promise.reject({
    code: 50000,
    success: false,
    message: '对不起，服务出错了',
  });
}

function createFlag(config: AxiosRequestConfig) {
  const { baseURL = '', url = '', method = '', data, params } = config;
  let flag = baseURL + url + '&' + method;
  if (data) {
    flag += `&${data}`;
  }
  if (params) {
    flag += `&${JSON.stringify(params)}`;
  }
  return flag;
}

function removePending(config: AxiosRequestConfig) {
  for (const p in pendingArr) {
    if (pendingArr.hasOwnProperty(p)) {
      const pending = pendingArr[p];
      if (pending.url === createFlag(config)) {
        pending.cancelFn('cancel');
        pendingArr.splice(+p, 1);
      }
    }
  }
}

let pendingArr: { url: string; cancelFn: (message?: string) => void }[] = [];
const CancelToken = Axios.CancelToken;

const axios = Axios.create({
  baseURL: '/',
  // 查询对象序列化函数
  paramsSerializer(params) {
    return qs.stringify(params);
  },
  // 请求后的数据处理
  transformResponse: [
    function(data) {
      return data;
    },
  ],
  // 跨域是否带token
  withCredentials: false,
  responseType: 'json',
  // xsrf 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus(status) {
    return status >= 200 && status < 300;
  },
});
axios.interceptors.request.use(
  config => {
    removePending(config);
    config.cancelToken = new CancelToken(cancelFn => {
      pendingArr.push({
        url: createFlag(config),
        cancelFn,
      });
    });
    return getToken()
      .then(token => {
        const { headers, ...rest } = config;
        return {
          ...rest,
          headers: {
            ...headers,
            'access-token': token,
          },
        };
      })
      .catch(() => {
        return {
          ...config,
        };
      });
  },
  err => {
    return Promise.reject(err);
  },
);
/**
 * 添加默认的请求拦截器，请求之前把token加到header中
 */
axios.interceptors.request.use(
  config => {
    const { headers, ...rest } = config;
    return {
      ...rest,
      headers: {
        ...headers,
        // access_token: token,
      },
    };
  },
  error => Promise.reject(error),
);

axios.interceptors.response.use(
  response => {
    removePending(response.config);
    return response;
  },
  err => {
    pendingArr = [];
    return Promise.reject(err);
  },
);

function post<T>(url: string, data?: string | object, option?: AxiosRequestConfig): Promise<AjaxResponse<T>> {
  return axios
    .post<T>(url, data, option)
    .then(handleSuccess)
    .catch(handleError);
}

export default {
  get: function<T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return axios
      .get<T>(url, { params: data })
      .then(handleSuccess)
      .catch(handleError);
  },
  postForm: function<T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return post<T>(url, qs.stringify(data || {}), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  },
  postJSON: function<T>(url: string, data?: object): Promise<AjaxResponse<T>> {
    return post<T>(url, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  authGet: function<T>(url: string, data?: object): Promise<AuthResponse<T>> {
    return axios
      .get<T>(url, { params: data })
      .then(handleSuccess)
      .catch(handleError);
  },
  authForm: function<T>(url: string, data?: object): Promise<AuthResponse<T>> {
    return axios
      .post<T>(url, qs.stringify(data || {}), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(handleSuccess)
      .catch(handleError);
  },
};

export interface HttpProps {
  get: <T>(url: string, option?: object) => Promise<AjaxResponse<T>>;
  postForm: <T>(url: string, data?: object) => Promise<AjaxResponse<T>>;
  postJSON: <T>(url: string, data?: object) => Promise<AjaxResponse<T>>;
  authGet: <T>(url: string, option?: object) => Promise<AuthResponse<T>>;
  authForm: <T>(url: string, data?: object) => Promise<AuthResponse<T>>;
}
