import { AxiosResponse } from "axios";
import axiosClient from "./axiosClient";

class LoginApi {
  static async login(): Promise<
    AxiosResponse<{ redirect_uri: string; session: string }>
  > {
    return await axiosClient.get("/auth/google");
  }
}

export default LoginApi;
