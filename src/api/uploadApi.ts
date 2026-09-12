import api from "../lib/axios";

type UploadImageResponse = {
  file: string;
};

export const uploadImage = async (file: File) => {
  const formData = new FormData();

  formData.append("file", file);

  const response = await api.post<UploadImageResponse>("/api/upload", formData);

  return response.data.file;
};
