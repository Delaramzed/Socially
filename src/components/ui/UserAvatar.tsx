import { useState } from "react";

type UserAvatarProps = {
  name?: string | null;
  image?: string | null;
  className?: string;
};

function UserAvatar({ name, image, className = "h-10 w-10" }: UserAvatarProps) {
  const [imageError, setImageError] = useState(false);

  const avatarLetter = name?.trim().charAt(0).toUpperCase() || "U";

  if (image && !imageError) {
    return (
      <img
        src={image}
        alt={name || "User"}
        onError={() => setImageError(true)}
        className={`${className} shrink-0 rounded-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`bg-primary text-primary-content flex shrink-0 items-center justify-center rounded-full font-semibold ${className}`}
    >
      {avatarLetter}
    </div>
  );
}

export default UserAvatar;
