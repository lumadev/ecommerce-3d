import { httpClientAuth } from "@/infra/http/httpClient";

interface UploadImageResponse {
  url: string;
  public_id: string;
}

export const imageUploadRepository = {
  upload: async (file: File): Promise<UploadImageResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await httpClientAuth.post<UploadImageResponse>(
      "/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};
