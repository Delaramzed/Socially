import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserProfile } from "../api/usersApi";
import { uploadImage } from "../api/uploadApi";

type UpdateProfileInput = {
  name?: string;
  bio?: string;
  location?: string;
  website?: string;
  image?: FileList | null;
};

export const useUpdateProfile = (userId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ image, ...rest }: UpdateProfileInput) => {
      const hasNewImage = image instanceof FileList && image.length > 0;
      const imageUrl = hasNewImage ? await uploadImage(image[0]) : undefined;

      return updateUserProfile(userId, {
        ...rest,
        ...(imageUrl ? { image: imageUrl } : {}),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Profile", userId] });
    },
  });
};
