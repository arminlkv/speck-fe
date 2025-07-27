export interface GoogleCalendarEvent {
  id: string;
  summary: string;
  start: string;
  end: string;
}

export interface EventListProps {
  events: GoogleCalendarEvent[];
}
