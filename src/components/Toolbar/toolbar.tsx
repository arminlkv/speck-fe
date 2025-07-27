import { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import {
  RiArrowGoForwardFill,
  RiArrowGoBackFill,
  RiRepeat2Fill,
} from "react-icons/ri";

import moment, { Moment } from "moment";
import { RangeOption, ToolbarProps } from "./types";
import { Tooltip } from "../ui/tooltip";
import GoogleProfile from "../UserProfile/UserProfile";

const MAX_RANGE_MONTHS = 3;

const CalendarToolbar: React.FC<ToolbarProps> = ({
  onRangeChange,
  onRefresh,
}) => {
  const [range, setRange] = useState<RangeOption>(7);
  const [startDate, setStartDate] = useState<Moment>(moment());

  const endDate = moment(startDate).add(range - 1, "days");

  const minDate = moment().subtract(MAX_RANGE_MONTHS, "months").startOf("day");
  const maxDate = moment().add(MAX_RANGE_MONTHS, "months").endOf("day");

  const handleRangeChange = (newRange: RangeOption) => {
    setRange(newRange);

    onRangeChange({
      startDate: startDate.toISOString(),
      endDate: moment(startDate)
        .add(newRange - 1, "days")
        .toISOString(),
      groupBy: newRange === 30 ? "week" : "day",
    });
  };

  useEffect(() => {
    if (onRangeChange) {
      onRangeChange({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        groupBy: range === 30 ? "week" : "day",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onRangeChange]);

  const navigate = (direction: "prev" | "next") => {
    const delta = direction === "prev" ? -range : range;
    const newStart = moment(startDate).add(delta, "days");
    const newEnd = moment(newStart).add(range - 1, "days");

    // Enforce 3-month bounds
    if (newStart.isBefore(minDate) || newEnd.isAfter(maxDate)) return;

    setStartDate(newStart);
    onRangeChange({
      startDate: newStart.toISOString(),
      endDate: moment(newStart)
        .add(range - 1, "days")
        .toISOString(),
      groupBy: range === 30 ? "week" : "day",
    });
  };

  const handleRefresh = (): void => {
    onRefresh();
  };

  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      align={{ base: "stretch", md: "center" }}
      justify="space-between"
      gap={4}
      p={4}
      bg="gray.50"
      borderRadius="md"
      boxShadow="sm"
      wrap="wrap"
    >
      {/* Date Range Display */}
      <Box textAlign={{ base: "left", md: "center" }}>
        <Text fontWeight="bold">Event Range</Text>
        <Text fontSize="sm" color="gray.600">
          {startDate.format("MMM D")} → {endDate.format("MMM D, YYYY")}
        </Text>
      </Box>

      {/* Range Buttons */}
      <ButtonGroup attached>
        {[1, 7, 30].map((val) => (
          <Button
            key={val}
            onClick={() => handleRangeChange(val as RangeOption)}
            colorScheme={range === val ? "blue" : undefined}
            variant={range === val ? "surface" : "solid"}
            border={range !== val ? "1px solid" : "none"}
          >
            {val} Day{val > 1 ? "s" : ""}
          </Button>
        ))}
      </ButtonGroup>

      {/* Navigation Arrows */}
      <Flex gap={2}>
        <Tooltip content={`Previous ${range} days`}>
          <Button
            onClick={() => navigate("prev")}
            disabled={moment(startDate)
              .subtract(range, "days")
              .isBefore(minDate)}
          >
            <RiArrowGoBackFill />
          </Button>
        </Tooltip>
        <Tooltip content={`Next ${range} days`}>
          <Button
            onClick={() => navigate("next")}
            disabled={moment(startDate).add(range, "days").isAfter(maxDate)}
          >
            <RiArrowGoForwardFill />
          </Button>
        </Tooltip>
      </Flex>

      {/* Refresh Button */}
      <Button onClick={handleRefresh} colorScheme="blue" border={"1px solid"}>
        <RiRepeat2Fill />
        Refresh Events
      </Button>
      <GoogleProfile />
    </Flex>
  );
};

export default CalendarToolbar;
