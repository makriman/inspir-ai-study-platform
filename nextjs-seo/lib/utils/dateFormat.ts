import { format } from "date-fns";

const dateFormat = (date: Date | string, pattern: string = "dd MMM yyyy"): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const formattedDate = format(dateObj, pattern);
  return formattedDate;
};

export default dateFormat;
