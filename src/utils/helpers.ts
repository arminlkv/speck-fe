import moment from "moment";
import Cookies from "js-cookie";
import { dateFormat } from "../constants/constants";
import { GoogleCalendarEvent } from "../components/EventList/types";
import LoginApi from "../apis/LoginApi";
import { NOTIFICATION_TYPES } from "../constants/notifications";
import CalendarApi from "../apis/CalendarApi";

/**
 * Formats a date string into a human-readable format for grouping by day.
 *
 * @param {string} groupKey
 * @returns {string}
 */
export const formatGroupWeekKey = (groupKey: string): string => {
  const weekStart = moment(groupKey, "GGGG-[W]WW").startOf("isoWeek");
  const weekEnd = moment(groupKey, "GGGG-[W]WW").endOf("isoWeek");
  const sameMonth = weekStart.month() === weekEnd.month();

  const startFormat = "MMM D";
  const endFormat = sameMonth ? "D, YYYY" : "MMM D, YYYY";

  return `${weekStart.format(startFormat)} - ${weekEnd.format(endFormat)}`;
};

/**
 * Filters events based on a date range.
 *
 * @param {GoogleCalendarEvent[]} events
 * @param {string} startDate
 * @param {string} endDate
 * @returns {GoogleCalendarEvent[]}
 */
export const filterEvents = (
  events: GoogleCalendarEvent[],
  startDate: string,
  endDate: string
): GoogleCalendarEvent[] => {
  const filtered = events.filter((event) => {
    const eventDate = moment(event.start).format(dateFormat);
    const start = moment(startDate).format(dateFormat);
    const end = moment(endDate).format(dateFormat);

    return eventDate >= start && eventDate <= end;
  });

  return filtered;
};

export const handleLogin = async (toaster: any) => {
  LoginApi.login()
    .then(({ data }) => {
      Cookies.set("session", JSON.stringify(data.session), { expires: 7 });
      window.location.replace(data.redirect_uri);
    })
    .catch((error) => {
      toaster.create(
        NOTIFICATION_TYPES(error.response?.data?.message || "An error occurred")
          .LOGIN_FAILED
      );
    });
};

/**
 * Handles re-syncing of calendar events.
 *
 * @async
 * @param {*} toaster
 * @param {(value: React.SetStateAction<GoogleCalendarEvent[]>) => void} setAllEvents
 * @returns {void) => any}
 */
export const handleEventsReSync = async (
  toaster: any,
  setAllEvents: (value: React.SetStateAction<GoogleCalendarEvent[]>) => void
) => {
  CalendarApi.syncEvents()
    .then((response) => {
      if (response.status === 200) {
        toaster.create(NOTIFICATION_TYPES().EVENTS_SYNCED);
      }

      CalendarApi.getEvents()
        .then((response) => {
          if (response.status === 200) {
            setAllEvents(response.data);
          }
        })
        .catch(() => {
          toaster.create(NOTIFICATION_TYPES().FETCH_EVENTS_FAILED);
        });
    })
    .catch(() => {
      toaster.create(NOTIFICATION_TYPES().EVENTS_SYNC_FAILED);
    });
};

export const handleSessionCheck = async (toaster: any): Promise<void> => {
  LoginApi.checkMe()
    .then(({ data }) => {
      Cookies.set("user", JSON.stringify(data), { expires: 7 });

      toaster.create(NOTIFICATION_TYPES().SESSION_VALID);

      return Promise.resolve();
    })
    .catch(() => {
      Cookies.remove("session");

      window.location.replace("/login");

      return Promise.reject(new Error("Session invalid"));
    });
};
