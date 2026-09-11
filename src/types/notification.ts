export interface SocialNotification {
  id: number;
  avatarUrl: string;
  userId: string;
  username: string;
  type: "COMMENT" | "LIKE" | "FOLLOW";
  postTitle?: string;
  comment?: string;
  createdAt: string;
  isRead: boolean;
}
