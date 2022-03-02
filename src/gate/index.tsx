import Axios, { AxiosRequestConfig, Method } from "axios";

const baseURL = "https://api-nodejs-todolist.herokuapp.com";
const client = Axios.create({
  baseURL,
  timeout: 30000,
});

const call = async (method: Method, url: string, data: {}) => {
  const headers: {
    Accept: string;
    "Content-Type": string;
    Authorization?: string;
  } = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("localStorageAuth")) {    
    const userToken = JSON.parse(
      localStorage.getItem("localStorageAuth") || ""
    ).token;
    console.log(userToken,'usertoken**');
    if (userToken) {
      headers.Authorization = `Bearer ${userToken}`;
    }
  }

  const requestConfig: AxiosRequestConfig<any> = {
    headers,
    method,
    url: baseURL + url,
  };

  if (method === "get") {
    requestConfig.params = data;
  } else {
    requestConfig.data = data;
  }

  console.log(requestConfig);

  try {
    const response = await client(requestConfig);
    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default call;
