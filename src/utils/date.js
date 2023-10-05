const ONE_DAY = 1000 * 60 * 60 * 24;
const ONE_YEAR = ONE_DAY * 365;

export const formatChatTimeFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  if (diff < ONE_DAY) {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } else if (diff < ONE_YEAR) {
    return date.toLocaleDateString([], { month: "short", day: "numeric" });
  }
  return date.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};
