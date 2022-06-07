export const getShortTimestamp = () => Date.now() / 1000;

export const getTimeUntil = (target: number) => {
  const duration = target - getShortTimestamp();
  return {
    hours: Math.floor(duration / 3600),
    minutes: Math.floor((duration / 60) % 60),
    seconds: Math.floor(duration % 60),
  };
};
