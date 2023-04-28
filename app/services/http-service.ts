import axios from "axios";

export const serverURL = axios.create({
  baseURL: "http://localhost:8081",
});

export class HttpService {
  post(url: string, data: any, callbackSuccess: any, callbackError: any) {
    axios.post(url, data).then(callbackSuccess).catch(callbackError);
  }
}
