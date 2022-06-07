import { useEffect, useState } from "react";

import { getTimeUntil } from "../utils/time";

type Props = {
  target: number;
};

const Countdown = ({ target }: Props) => {
  const [{ hours, minutes, seconds }, setCountdown] = useState(
    getTimeUntil(target)
  );

  useEffect(() => {
    const interval = setInterval(
      () => {
        setCountdown(getTimeUntil(target));
      },
      hours > 0 ? 5000 : 1000
    );

    return () => clearInterval(interval);
  }, [target, hours]);

  if (hours > 0) {
    return <>{`${hours}h ${minutes}m`}</>;
  }

  if (minutes > 0) {
    return <>{`${minutes}m ${seconds}s`}</>;
  }

  return <>{`${Math.max(seconds, 0)}s`}</>;
};

export default Countdown;
