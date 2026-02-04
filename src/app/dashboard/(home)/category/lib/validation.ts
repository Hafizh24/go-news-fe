import z from "zod";

export const categoryFormSchema = z.object({
  title: z.string({ error: "Title is required" }),
});
