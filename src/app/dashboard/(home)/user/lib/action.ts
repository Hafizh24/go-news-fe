import { UpdatePasswordRequest } from "@/model/User";
import axiosInstance from "../../../../../../lib/axios";

export const updatePassword = async (passwordData: UpdatePasswordRequest) => {
  try {
    const response = await axiosInstance.put(
      `/admin/users/update-password`,
      passwordData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
