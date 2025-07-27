import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
} from "react";
import { Box, Button, Text, useDisclosure } from "@chakra-ui/react";
import Cookies from "js-cookie";
import CalendarToolbar from "../components/Toolbar/toolbar";
import EventList from "../components/EventList/EventList";
import moment from "moment";
import {
  filterEvents,
  formatGroupWeekKey,
  handleEventsReSync,
  handleSessionCheck,
} from "../utils/helpers";
import { GroupBy } from "../components/Toolbar/types";
import { dateFormat } from "../constants/constants";
import { Toaster, toaster } from "../components/ui/toaster";
import { GoogleCalendarEvent } from "../components/EventList/types";
import NewEventModal from "../components/NewEventModal/NewEventModal";
import CalendarApi from "../apis/CalendarApi";

const Home = () => {
  const { open, onOpen, onClose } = useDisclosure();

  const [allEvents, setAllEvents] = useState<GoogleCalendarEvent[]>([]);
  const [events, setEvents] = useState<GoogleCalendarEvent[]>([]);
  const [groupBy, setGroupBy] = useState<GroupBy>("day");
  const hasRun = useRef(false);
  const handleRangeChange = useCallback(
    ({
      startDate,
      endDate,
      groupBy,
    }: {
      startDate: string;
      endDate: string;
      groupBy: GroupBy;
    }) => {
      setEvents(filterEvents(allEvents, startDate, endDate));

      setGroupBy(groupBy);
    },
    [allEvents]
  );

  const groupedEvents = useMemo(() => {
    const groupEvents = (
      events: GoogleCalendarEvent[],
      groupBy: GroupBy
    ): Record<string, GoogleCalendarEvent[]> => {
      const grouped: Record<string, GoogleCalendarEvent[]> = {};

      events.forEach((event) => {
        const startMoment = moment(event.start);

        let key = "";
        if (groupBy === "day") {
          key = startMoment.format(dateFormat); // e.g. 2025-07-26
        } else {
          // group by ISO week year and week number e.g. 2025-W31
          key = startMoment.format("GGGG-[W]WW");
        }

        if (!grouped[key]) grouped[key] = [];
        grouped[key].push(event);
      });

      return grouped;
    };

    return groupEvents(events, groupBy);
  }, [events, groupBy]);

  const onRefresh = () => {
    handleEventsReSync(toaster, setAllEvents);
  };

  useEffect(() => {
    // Check if user is already logged in
    if (hasRun.current) return; // Prevent running this logic more than once since we are not using strict mode
    hasRun.current = true;

    const session = JSON.parse(Cookies.get("session") || "");
    if (!session) {
      // No session found, redirect to login
      window.location.replace("/login");

      return;
    }

    if (session) {
      // Try to auth with the session
      handleSessionCheck(toaster).then(() => {
        handleEventsReSync(toaster, setAllEvents);
      });
    }
  }, []);

  const handleCreateNewEvent = (newEvent: {
    name: string;
    start: string;
    end: string;
  }) => {
    CalendarApi.createEvent({
      start: newEvent.start,
      end: newEvent.end,
      summary: newEvent.name,
    })
      .then((response) => {
        console.log("Event created successfully:", response.data);

        const newEvents = [...allEvents, response.data];
        setAllEvents(newEvents);
        setEvents(newEvents);
      })
      .catch((error) => {
        toaster.error("Failed to create event");
        console.error("Error creating event:", error);
      });
  };

  return (
    <Box p={4}>
      <Toaster />
      <CalendarToolbar
        onRangeChange={handleRangeChange}
        onRefresh={onRefresh}
      />

      <Box mt={8}>
        {events.length === 0 ? (
          <Text p={4} color="gray.500" fontStyle="italic" textAlign="center">
            No events on the selected dates
          </Text>
        ) : (
          Object.entries(groupedEvents).map(([groupKey, eventsInGroup]) => (
            <Box key={groupKey} mb={6}>
              <Text fontWeight="bold" fontSize="lg" mb={2}>
                {groupBy === "day"
                  ? moment(groupKey).format("dddd, MMM D, YYYY")
                  : formatGroupWeekKey(groupKey)}
              </Text>
              <EventList events={eventsInGroup} />
            </Box>
          ))
        )}
      </Box>

      <Box mt={8} textAlign="center">
        <Button colorScheme="blue" onClick={onOpen}>
          New Event
        </Button>
      </Box>

      <NewEventModal
        isOpen={open}
        onClose={onClose}
        onCreate={handleCreateNewEvent}
      />
    </Box>
  );
};

export default Home;
