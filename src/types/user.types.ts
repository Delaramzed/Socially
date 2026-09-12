export type recommendedUserResponse = {
  message: string;
  success: boolean;
  data: user[];
};

export type user = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
  bio: string | null;
  location: string | null;
  website: string | null;
  createdAt: string;
  updatedAt: string;
  _count: {
    followers: number;
    followings: number;
    posts: number;
  };
  followers: {
    followerId: string;
  }[];
};
