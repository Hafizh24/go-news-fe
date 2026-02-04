/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { setupInterceptor } from "../../../../../../lib/axios";
import { FC, useEffect, useState } from "react";
import { Category } from "@/model/Category";
import { categoryFormSchema } from "../lib/validation";
import { createCategory, editCategory } from "../lib/action";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButtonForm from "../../components/submit-button";

interface FormCategoryProps {
  type?: "ADD" | "EDIT";
  defaultValue?: Category | null;
}

const FormCategory: FC<FormCategoryProps> = ({ type, defaultValue }) => {
  setupInterceptor();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [error, setError] = useState<string[]>([]);

  useEffect(() => {
    if (type === "EDIT" && defaultValue) {
      setTitle(defaultValue.title);
    }
  }, [type, defaultValue]);

  const handleCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    try {
      const validation = categoryFormSchema.safeParse({ title });
      if (!validation.success) {
        const errorMessage = validation.error.issues.map(
          (issue) => issue.message,
        );
        setError(errorMessage);
        return;
      }

      if (type === "ADD") {
        await createCategory({ title });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Category created successfully",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/dashboard/category");
      } else {
        if (defaultValue?.id) {
          await editCategory(defaultValue.id, { title });
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Category updated successfully",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });
          router.push("/dashboard/category");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Category ID is missing",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        toast: true,
        showConfirmButton: false,
        timer: 1500,
      });

      setError(
        error instanceof Error
          ? [error.message]
          : ["An unexpected error occurred"],
      );
    }
  };

  return (
    <form onSubmit={handleCategory} className="space-y-4">
      {error.length > 0 && (
        <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 rounded-lg text-white">
          <div className="font-bold mb-4">
            <ul className="list-disc list-inside">
              {error.map((value, index) => (
                <li key={index}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          placeholder="Title..."
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <SubmitButtonForm />
      </div>
    </form>
  );
};

export default FormCategory;
