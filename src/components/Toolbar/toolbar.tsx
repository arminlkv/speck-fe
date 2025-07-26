import { useState, useEffect } from "react";
import { Box, Button, ButtonGroup, Flex, Text } from "@chakra-ui/react";
import { RiArrowGoForwardFill, RiArrowGoBackFill } from "react-icons/ri";

import moment, { Moment } from "moment";
import { RangeOption, ToolbarProps } from "./types";
import { Tooltip } from "../ui/tooltip";

const MAX_RANGE_MONTHS = 3;

const CalendarToolbar: React.FC<ToolbarProps> = ({ onRangeChange }) => {
  const [range, setRange] = useState<RangeOption>(7);
  const [startDate, setStartDate] = useState<Moment>(moment());

  const endDate = moment(startDate).add(range - 1, "days");

  const minDate = moment().subtract(MAX_RANGE_MONTHS, "months").startOf("day");
  const maxDate = moment().add(MAX_RANGE_MONTHS, "months").endOf("day");

  const handleRangeChange = (newRange: RangeOption) => {
    setRange(newRange);
  };

  const navigate = (direction: "prev" | "next") => {
    const delta = direction === "prev" ? -range : range;
    const newStart = moment(startDate).add(delta, "days");
    const newEnd = moment(newStart).add(range - 1, "days");

    // Enforce 3-month bounds
    if (newStart.isBefore(minDate) || newEnd.isAfter(maxDate)) return;

    setStartDate(newStart);
  };

  useEffect(() => {
    if (onRangeChange) {
      onRangeChange({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        groupBy: range === 30 ? "week" : "day",
      });
    }
  }, [startDate, range, onRangeChange, endDate]);

  return (
    <Flex
      align="center"
      justify="space-between"
      p={4}
      bg="gray.50"
      borderRadius="md"
      boxShadow="sm"
    >
      <Box textAlign="center">
        <Text fontWeight="bold">Event Range</Text>
        <Text fontSize="sm" color="gray.600">
          {startDate.format("MMM D")} → {endDate.format("MMM D, YYYY")}
        </Text>
      </Box>

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
      <Flex align="center" gap={2}>
        <Tooltip content={`Previous ${range} days`}>
          <Button
            aria-label="Previous"
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
            aria-label="Next"
            onClick={() => navigate("next")}
            disabled={moment(startDate).add(range, "days").isAfter(maxDate)}
          >
            <RiArrowGoForwardFill />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default CalendarToolbar;
