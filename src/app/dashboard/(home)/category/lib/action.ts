/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../../../../../../lib/axios";

export const createCategory = async (categoryData: any) => {
  try {
    const response = await axiosInstance.post(
      "/admin/categories",
      categoryData,
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editCategory = async (categoryId: number, categoryData: any) => {
  try {
    const response = await axiosInstance.put(
      `/admin/categories/${categoryId}`,
      categoryData,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteCategory = async (categoryId: number) => {
  try {
    const response = await axiosInstance.delete(
      `/admin/categories/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
