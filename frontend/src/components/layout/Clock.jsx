import { useEffect, useState } from "react";

function Clock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(timer);
  }, []);

  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Manila",
  });

  return (
    <p className="clock">
      Local time <span className="clock-time">{time}</span>
    </p>
  );
}

export default Clock;
