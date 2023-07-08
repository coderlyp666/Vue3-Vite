import axios from "axios";

class YPRequest {
  constructor(config) {
    this.instance = axios.create(config);
    this.instance.interceptors.request.use(
      config => {
        return config;
      },
      err => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      config => {
        return config;
      },
      err => {
        return err;
      }
    );
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  get(config) {
    return this.request({
      ...config,
      method: "get",
    });
  }

  post(config) {
    return this.request({
      ...config,
      method: "post",
    });
  }
}

export default YPRequest;
