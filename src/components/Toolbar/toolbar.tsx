import React, { useEffect, useState } from "react";
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
      align="center"
      justify="space-between"
      p={4}
      bg="gray.50"
      borderRadius="md"
      boxShadow="sm"
      wrap="nowrap"
      gap={4}
    >
      {/* Left - Dates */}
      <Box flex="0 0 auto" textAlign="left" minWidth="140px">
        <Text fontWeight="bold" lineHeight="1.2">
          Event Range
        </Text>
        <Text fontSize="sm" color="gray.600" mb={2}>
          {startDate.format("MMM D")} → {endDate.format("MMM D, YYYY")}
        </Text>
      </Box>

      {/* Center - Controls */}
      <Flex
        flex="1 1 auto"
        align="center"
        justify="center"
        gap={4}
        flexWrap="nowrap"
      >
        {/* Range Buttons */}
        <ButtonGroup attached>
          {[1, 7, 30].map((val) => (
            <Button
              key={val}
              onClick={() => handleRangeChange(val as RangeOption)}
              colorScheme={range === val ? "blue" : undefined}
              variant={range === val ? "surface" : "solid"}
              border={range !== val ? "1px solid" : "none"}
              minW="60px"
            >
              {val} Day{val > 1 ? "s" : ""}
            </Button>
          ))}
        </ButtonGroup>

        {/* Navigation Arrows */}
        <Flex gap={2} align="center">
          <Tooltip content={`Previous ${range} days`}>
            <Button
              onClick={() => navigate("prev")}
              disabled={moment(startDate)
                .subtract(range, "days")
                .isBefore(minDate)}
              size="sm"
            >
              <RiArrowGoBackFill />
            </Button>
          </Tooltip>
          <Tooltip content={`Next ${range} days`}>
            <Button
              onClick={() => navigate("next")}
              disabled={moment(startDate).add(range, "days").isAfter(maxDate)}
              size="sm"
            >
              <RiArrowGoForwardFill />
            </Button>
          </Tooltip>
        </Flex>

        {/* Refresh */}
        <Button
          onClick={handleRefresh}
          colorScheme="blue"
          variant="solid"
          size="sm"
          border="1px solid"
          ml={2}
          minW="130px"
        >
          <RiRepeat2Fill style={{ marginRight: 6 }} />
          Refresh Events
        </Button>
      </Flex>

      {/* Right - Avatar */}
      <Box flex="0 0 auto" ml="auto">
        <GoogleProfile />
      </Box>
    </Flex>
  );
};

export default CalendarToolbar;
