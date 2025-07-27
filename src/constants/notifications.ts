export const NOTIFICATION_TYPES = (errorMessage?: string) => ({
  LOGIN_FAILED: {
    type: "error",
    title: "Login failed",
    description: errorMessage || "An error occurred",
    duration: 5000,
  },
  FETCH_EVENTS_FAILED: {
    type: "error",
    title: "Error fetching events",
    description: errorMessage || "Please try again later.",
    duration: 3000,
  },
  EVENTS_SYNC_FAILED: {
    type: "error",
    title: "Error syncing events",
    description: errorMessage || "Please try again later.",
    duration: 3000,
  },
  EVENTS_SYNCED: {
    type: "success",
    title: "Events synced",
    description: "Your calendar events have been updated.",
  },
  SESSION_VALID: {
    type: "success",
    title: "Session valid",
    description: "You are logged in",
    duration: 3000,
  },

  SESSION_EXPIRED: {
    type: "warning",
    title: "Session expired",
    description: errorMessage || "Your session has expired",
    duration: 5000,
  },
});
