/**
 * Use this to make api calls!
 */

export default class Api {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.getCaches = {};
  }

  call(url, passedFetchConfig) {
    //if there is an auth JWT in the cookies, include it window.wl.utils.cookies;
    const fetchConfig = Object.assign({}, passedFetchConfig);
    const JWT = window.wl.utils.cookies.get('JWT');
    if (JWT.length > 0) {
      fetchConfig.headers = {
        Authorization: JWT
      };
    }

    return new Promise((resolve, reject) => {
      fetch(this.baseUrl + url, fetchConfig).then((res) => {
        return res.json();
      }).then((jsonizedRes) => {
        resolve(jsonizedRes);
      }).catch((err) => {
        console.error(`REQUEST FAIL ${url}`, err);
        reject(err);
      });
    });
  }

  get(url, bustCache) {
    if (typeof this.getCaches[url] === 'undefined' || typeof bustCache !== 'undefined') {
      this.getCaches[url] = this.call(url, { method: 'GET' });
    }

    return this.getCaches[url];
  }

  post(url, data) {
    return this.call(url, { method: 'POST', body: data });
  }
}
