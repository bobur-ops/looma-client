import { useState, useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export const useTimeAgo = (date: string | number | Date) => {
  // Use a piece of state to trigger re-renders
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const update = () => {
      const d = new Date(date);
      // Only update if date is valid
      if (!isNaN(d.getTime())) {
        setTimeAgo(formatDistanceToNow(d, { addSuffix: true }));
      }
    };

    update(); // Initial call

    const interval = setInterval(update, 60000); // Update every 1 minute
    return () => clearInterval(interval); // Cleanup on unmount
  }, [date]);

  return timeAgo;
};
