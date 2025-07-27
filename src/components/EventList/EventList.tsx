import React from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import moment from "moment";
import { dateFormat } from "../../constants/constants";
import { GoogleCalendarEvent } from "./types";

interface EventListProps {
  events: GoogleCalendarEvent[];
}

type EventsByDate = Record<string, GoogleCalendarEvent[]>;

const EventList: React.FC<EventListProps> = ({ events }) => {
  const sortedEvents = [...events].sort((a, b) =>
    moment(a.start).diff(moment(b.start))
  );

  const groupedEvents: EventsByDate = sortedEvents.reduce((groups, event) => {
    const day = moment(event.start).format(dateFormat);
    if (!groups[day]) {
      groups[day] = [];
    }
    groups[day].push(event);
    return groups;
  }, {} as EventsByDate);

  return (
    <VStack align="stretch">
      {Object.entries(groupedEvents).map(([date, dayEvents]) => (
        <Box key={date}>
          <VStack align="stretch">
            {dayEvents.map((event) => (
              <Box
                key={event.id}
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="sm"
              >
                <Text fontWeight="bold">{event.summary || "No Title"}</Text>
                <Text fontSize="sm" color="gray.600">
                  {moment(event.start).format("HH:mm")} –{" "}
                  {moment(event.end).format("HH:mm")}
                </Text>
              </Box>
            ))}
          </VStack>
          <hr />
        </Box>
      ))}
    </VStack>
  );
};

export default EventList;
