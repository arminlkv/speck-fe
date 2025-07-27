import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import axiosClient from "./axiosClient";

class LoginApi {
  static async login(): Promise<
    AxiosResponse<{ redirect_uri: string; session: string }>
  > {
    return await axiosClient.get("/auth/google");
  }
  static async checkMe(): Promise<any> {
    return await axiosClient.get("/api/user/me", {
      headers: { "x-speck-session": JSON.parse(Cookies.get("session") || "") },
    });
  }
}

export default LoginApi;
