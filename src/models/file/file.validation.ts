import { z } from "zod";

export const fileSchema = z.object({
  originalName: z
    .string()
    .min(1, "File name is required"),

  mimeType: z
    .enum([
      "image/png",
      "image/jpeg",
      "image/webp",
    ]),

  size: z
    .number()
    .positive("File size must be greater than 0")
    .max(
      5 * 1024 * 1024,
      "File size must not exceed 5 MB"
    ),
});

export const fileIdSchema = z.object({
  id: z
    .string()
    .min(1, "File ID is required"),
});