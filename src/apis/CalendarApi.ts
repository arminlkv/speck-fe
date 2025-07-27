import { AxiosResponse } from "axios";
import Cookies from "js-cookie";
import axiosClient from "./axiosClient";

class CalendarApi {
  static async getEvents(): Promise<AxiosResponse<any>> {
    return await axiosClient.get("/api/user/calendar", {
      headers: { "x-speck-session": JSON.parse(Cookies.get("session") || "") },
    });
  }

  static async syncEvents(): Promise<AxiosResponse<any>> {
    return await axiosClient.post(
      "/api/user/calendar/sync",
      {},
      {
        headers: {
          "x-speck-session": JSON.parse(Cookies.get("session") || ""),
        },
      }
    );
  }
}

export default CalendarApi;
