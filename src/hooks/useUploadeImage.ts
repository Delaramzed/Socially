import { useMutation } from "@tanstack/react-query";
import { uploadImage } from "../api/uploadApi";

export function useUploadImage() {
  return useMutation({
    mutationFn: uploadImage,
  });
}