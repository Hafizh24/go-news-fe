import { ContentRequest } from "@/model/Content";
import axiosInstance from "../../../../../../lib/axios";

export const uploadImage = async (fileUpload: File) => {
  try {
    const formData = new FormData();
    formData.append("image", fileUpload);

    const response = await axiosInstance.post(
      "/admin/contents/upload-image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createContent = async (contentData: ContentRequest) => {
  try {
    const response = await axiosInstance.post("/admin/contents", contentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editContent = async (
  contentData: ContentRequest,
  contentId: number,
) => {
  try {
    const response = await axiosInstance.put(
      `/admin/contents/${contentId}`,
      contentData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteContent = async (contentId: number) => {
  try {
    const response = await axiosInstance.delete(`/admin/contents/${contentId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
