import z from "zod";

export const CreateCertAchievementValidator = z.object({
    name: z.string().min(1, { message: "Title is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    link: z.string().url({ message: "Link must be a valid URL" }),
})

export const UpdateCertAchievementValidator = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    link: z.string().url({ message: "Link must be a valid URL" }).optional(),
})