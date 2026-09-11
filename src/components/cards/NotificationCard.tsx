import { ChatIcon, HeartIcon } from "../../assets/icons";
import { UserRoundPlus } from "lucide-react";
import type { SocialNotification } from "../../types/notification";
import { Link } from "react-router-dom";
 import {TrashIcon} from "../../assets/icons"


interface NotificationCardProps {
  notification: SocialNotification;
  onMarkAsRead?: () => void;
  onDelete?: () => void;
}

function NotificationCard(props: NotificationCardProps) {
  const notification = props.notification;
  const Icon =
    notification.type === "like"
      ? HeartIcon
      : notification.type === "follow"
        ? UserRoundPlus
        : ChatIcon;
  const message =
    notification.type === "like"
      ? "liked your post"
      : notification.type === "follow"
        ? "started following you"
        : "commented on your post";
  const iconColor =
    notification.type === "like"
      ? "text-error"
      : notification.type === "follow"
        ? "text-success"
        : "text-primary";
  const backgroundColor = !notification.isRead
    ? "bg-base-300/35"
    : "bg-base-100";

  return (
    <section
      className={`border-base-300 relative flex items-start gap-2 border-b px-4 py-5 ${backgroundColor}`}
      onClick={props.onMarkAsRead}
    >
      <Link
        to={`/profile/${notification.userId}`}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={notification.avatarUrl}
          alt={`${notification.username}'s avatar`}
          className="h-10 w-10 shrink-0 cursor-pointer rounded-full object-cover"
        />
      </Link>
      <div className="min-w-0 flex-1 pr-5">
        <p className="text-base-content flex items-center gap-2 text-sm">
          <Icon className={`${iconColor} h-4 w-4 shrink-0`} />
          <span>
            <Link
              to={`/profile/${notification.userId}`}
              onClick={(e) => e.stopPropagation()}
              className="cursor-pointer font-semibold"
            >
              {notification.username}
            </Link>{" "}
            {message}
          </span>
        </p>
        {notification.postTitle && (
          <p className="bg-base-200 text-base-content/70 mt-3 ml-6 rounded-md px-3 py-2 text-sm">
            {notification.postTitle}
          </p>
        )}
        {notification.comment && (
          <p className="bg-base-300/50 text-base-content/70 mt-2 ml-6 rounded-md px-3 py-2 text-sm">
            {notification.comment}
          </p>
        )}
        <p className="text-base-content/50 mt-2 ml-6 text-xs">
          {notification.createdAt}
        </p>
      </div>
     <div className="absolute top-5 right-4 flex items-center gap-3">
  {!notification.isRead && (
    <span className="bg-primary h-2 w-2 rounded-full" />
  )}

  <button
    type="button"
    onClick={(e) => {
      e.stopPropagation();
      props.onDelete?.();
    }}
    className="text-base-content/50 hover:text-error transition-colors"
  >
    <TrashIcon className="h-4 w-4" />
  </button>
</div>
    </section>
  );
}
export default NotificationCard;
