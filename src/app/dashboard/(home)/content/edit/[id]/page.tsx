/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { FC, useEffect, useState } from "react";
import axiosInstance, {
  setupInterceptor,
} from "../../../../../../../lib/axios";
import { Content } from "@/model/Content";
import { ApiResponse } from "@/model/ApiResponse";
import FormContentPage from "../../components/form-content";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { Category } from "@/model/Category";

type Params = {
  id: number;
};

interface EditContentPageProps {
  params: Promise<Params>;
}

const EditContentPage: FC<EditContentPageProps> = ({ params }) => {
  setupInterceptor();

  const resolvedParams = React.use(params);
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse<Content>>(
          `/admin/contents/${resolvedParams.id}`,
        );
        setContent(response.data.data);
        setLoading(false);
      } catch (error: any) {
        setError(error.message || "Failed to fetch content");
      } finally {
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response =
          await axiosInstance.get<ApiResponse<Category[]>>("/admin/categories");
        setCategories(response.data.data);
      } catch (error: any) {
        setError(error.message || "Failed to fetch categories");
      }
    };

    fetchCategories();
    fetchData();
  }, [resolvedParams.id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error)
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <div className="my-5 text-2xl font-bold">Edit Content</div>
      </div>

      <FormContentPage
        type="EDIT"
        defaultValues={content}
        categoryList={categories}
      />
    </div>
  );
};

export default EditContentPage;
