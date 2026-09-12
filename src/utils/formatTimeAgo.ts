export function formatTimeAgo(date: string) {
  const now = Date.now();
  const postDate = new Date(date).getTime();

  const diff = now - postDate;

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} minutes ago`;
  if (hours < 24) return `${hours} hours ago`;

  return `${days} days ago`;
}
