import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleTimeString("en-GB", {
        hour12: false, // 24-hour format
      });
      setTime(formatted);
    };

    updateTime(); // set immediately on mount
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="header-right">
      <span className="timestamp">{time}</span>
    </div>
  );
}
