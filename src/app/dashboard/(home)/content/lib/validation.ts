import z from "zod";

export const contentFormSchema = z.object({
  title: z.string({ error: "Title is required" }),
  excerpt: z.string({ error: "Excerpt is required" }),
  description: z.string({ error: "Description is required" }),
  categoryID: z.string({ error: "Category is required" }),
});
