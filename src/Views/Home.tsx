import CalendarToolbar from "../components/Toolbar/toolbar";
import { GroupBy } from "@/components/Toolbar/types";
import { Box } from "@chakra-ui/react";
import { useCallback, useState } from "react";

const Home = () => {
  const [startDate, setStartDate] = useState<string>();
  const [endDate, setEndDate] = useState<string>();
  const [groupBy, setGroupBy] = useState<GroupBy>("day");

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
      setStartDate(startDate);
      setEndDate(endDate);
      setGroupBy(groupBy);
    },
    []
  );

  return (
    <Box>
      <CalendarToolbar onRangeChange={handleRangeChange} />
      <Box mt={4} p={4} border="1px solid #ccc" borderRadius="md">
        <strong>Current Range:</strong>
        <p>Start: {startDate}</p>
        <p>End: {endDate}</p>
        <p>Group By: {groupBy}</p>
      </Box>
    </Box>
  );
};

export default Home;
