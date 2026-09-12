import {
  useGetNotifications,
  useMarkNotificationsAsRead,
} from "../hooks/useNotifications";

import { AlertCircle } from "lucide-react";

import NotificationCard from "../components/cards/NotificationCard";
import { NotificationPageSkeleton } from "../components/ui/Skeleton";
import type { SocialNotification } from "../types/notification";

function NotificationPage() {
  const {
    data,
    isLoading: isPageLoading,
    isError,
    refetch,
  } = useGetNotifications();

  const { mutate: markAllAsRead, isPending: isMarkingLoading } =
    useMarkNotificationsAsRead();
  console.log("notifications data:", data);

  const notificationItems: Array<SocialNotification> = Array.isArray(data)
    ? data
    : [];

  const unreadCount = notificationItems.filter((item) => !item.isRead).length;

  if (isPageLoading) {
    return <NotificationPageSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-error bg-error/10 border-error/20 m-4 flex flex-col items-center gap-3 rounded-lg border p-4">
        <AlertCircle className="h-6 w-6" />
        <p className="font-medium">Something went wrong!</p>
        <button
          type="button"
          onClick={() => refetch()}
          className="text-error btn btn-sm btn-outline btn-error bg-error/30 hover:bg-error/50 cursor-pointer rounded-md px-3 py-1 text-sm font-medium transition duration-300 ease-in-out"
        >
          Try Again!
        </button>
      </div>
    );
  }

  return (
    <section className="bg-base-100 border-base-300 mb-20 flex max-w-233 flex-col overflow-hidden rounded-xl border shadow-sm">
      <header className="border-base-300 flex items-center justify-between border-b px-5 py-4">
        <h1 className="text-base-content text-lg font-bold">Notifications</h1>
        <div className="flex items-center gap-3">
          <span className="text-base-content/50 text-xs">
            {unreadCount} unread
          </span>
          {unreadCount > 0 && (
            <button
              type="button"
              disabled={isMarkingLoading}
              onClick={() => markAllAsRead()}
              className="text-base-content hover:bg-base-300 cursor-pointer rounded-md p-2 text-xs font-medium transition duration-300 ease-in-out"
            >
              {isMarkingLoading ? (
                <div className="flex items-center gap-2">
                  <span className="loading loading-spinner loading-xs" />
                  <span className="font-mono">Loading...</span>
                </div>
              ) : (
                "Mark as read"
              )}
            </button>
          )}
        </div>
      </header>

      <main>
        {notificationItems.length === 0 ? (
          // Empty State
          <div className="text-base-content/50 flex h-40 flex-col items-center justify-center gap-2">
            <p>Your notifications are taking a nap.😴</p>
            <p>Check back later!</p>
          </div>
        ) : (
          // Success State
          notificationItems.map((item) => (
            <NotificationCard
              key={item.id}
              notification={item}
              onMarkAsRead={() => markAllAsRead()}
            />
          ))
        )}
      </main>
    </section>
  );
}

export default NotificationPage;
