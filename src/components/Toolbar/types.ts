export type GroupBy = "day" | "week";

export interface ToolbarProps {
  onRangeChange?: (params: {
    startDate: string;
    endDate: string;
    groupBy: GroupBy;
  }) => void;
}

export type RangeOption = 1 | 7 | 30;
