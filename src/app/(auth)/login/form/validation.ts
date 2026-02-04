import z from "zod";

export const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters long"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
