/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Content } from "@/model/Content";
import { FC, useEffect, useState } from "react";
import { setupInterceptor } from "../../../../../../lib/axios";
import { useRouter } from "next/navigation";
import { Category } from "@/model/Category";
import { contentFormSchema } from "../lib/validation";
import Swal from "sweetalert2";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import SubmitButtonForm from "../../components/submit-button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Textarea } from "@/components/ui/textarea";
import { createContent, editContent, uploadImage } from "../lib/action";
import Image from "next/image";

interface FormContentProps {
  type?: "ADD" | "EDIT";
  defaultValues?: Content | null;
  categoryList: Category[];
}

const FormContentPage: FC<FormContentProps> = ({
  type,
  defaultValues,
  categoryList,
}) => {
  setupInterceptor();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [excerpt, setExcerpt] = useState("");
  const [description, setDescription] = useState("");
  const [categoryID, setCategoryID] = useState(
    defaultValues?.category_id.toString() || "",
  );
  const [tags, setTags] = useState("");
  const [status, setStatus] = useState(defaultValues?.status || "");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState(defaultValues?.image || "");
  const [error, setError] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const previewUrl = URL.createObjectURL(file);
      setPreviewImage(previewUrl);
      setImage(file);
    }
  };

  const handleCategoryChange = (value: string) => {
    setCategoryID(value);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const statusList = [
    { value: "PUBLISH", label: "Publish" },
    { value: "DRAFT", label: "Draft" },
  ];

  useEffect(() => {
    if (categoryList) {
      setCategories(categoryList);
    }
  }, [categoryList]);

  useEffect(() => {
    if (type === "EDIT" && defaultValues) {
      setTitle(defaultValues.title);
      setExcerpt(defaultValues.excerpt);
      setDescription(defaultValues.description);
      setCategoryID(defaultValues.category_id.toString());
      setTags(defaultValues.tags.toString());
      setStatus(defaultValues.status);
      setPreviewImage(defaultValues.image);
    }
  }, [type, defaultValues]);

  const handleContent = async (e: React.FormEvent) => {
    e.preventDefault();
    setError([]);

    try {
      const validation = contentFormSchema.safeParse({
        title,
        categoryID,
        excerpt,
        description,
      });

      if (!validation.success) {
        const errorMessage = validation.error.issues.map(
          (issue) => issue.message,
        );
        setError(errorMessage);
        return;
      }

      if (type === "ADD") {
        if (!image) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image is required",
            toast: true,
            showConfirmButton: false,
            timer: 1500,
          });

          return;
        }

        setIsUploading(true);

        const imageUrl = await uploadImage(image);

        await createContent({
          title: title,
          excerpt: excerpt,
          description: description,
          image: imageUrl.data.urlImage,
          category_id: Number(categoryID),
          tags: tags,
          status: status,
        });
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Content created successfully",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/dashboard/content");
      }

      let imageUrl;
      if (!image) {
        imageUrl = previewImage;
      } else {
        setIsUploading(true);
        imageUrl = await uploadImage(image);
      }

      if (defaultValues?.id) {
        await editContent(
          {
            title: title,
            excerpt: excerpt,
            description: description,
            image: imageUrl.data ? imageUrl.data.urlImage : imageUrl,
            category_id: Number(categoryID),
            tags: tags,
            status: status,
          },
          defaultValues.id,
        );

        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Content updated successfully",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        router.push("/dashboard/content");
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Content not found",
          toast: true,
          showConfirmButton: false,
          timer: 1500,
        });

        window.location.reload();
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

      setError(error instanceof Error ? [error.message] : []);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleContent} className="space-y-4">
      {error.length > 0 && (
        <div className="mx-auto my-7 bg-red-500 w-[400px] p-4 rounded-lg text-white">
          <div className="font-bold mb-4">
            <ul className="list-disc list-inside">
              {error.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Choose Category</Label>
          <Select
            name="categoryID"
            value={categoryID}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger id="categoryID">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Input
            placeholder="Excerpt..."
            name="excerpt"
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="tags">Tags</Label>
          <Input
            placeholder="Use comma to separate tags"
            name="tags"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            placeholder="Description..."
            name="description"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="image">Upload Image</Label>
          <Input
            name="image"
            id="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Choose Status</Label>
          <Select
            name="status"
            value={status}
            onValueChange={handleStatusChange}
          >
            <SelectTrigger id="status">
              <SelectValue placeholder="Select Status" />
            </SelectTrigger>
            <SelectContent>
              {statusList.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="previewImage">Preview Image</Label>
          {previewImage && (
            <Image src={previewImage} alt="Preview" width="100" height="100" />
          )}
        </div>
      </div>

      <div className="space-y-2">
        <SubmitButtonForm />
      </div>
    </form>
  );
};

export default FormContentPage;
