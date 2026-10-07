"use client";
import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

/** Live campus time (IST). Renders a neutral placeholder on the server. */
export default function LocalClock() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time suppressHydrationWarning>
      {time ?? "--:--:--"} IST
    </time>
  );
}
