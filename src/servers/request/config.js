import YPRequest from "./index.js";

const hyRetsuet = new YPRequest({
  baseURL: "https://service.test.nttcc.com.cn/",
  timeout: 10000,
});

export default hyRetsuet;
