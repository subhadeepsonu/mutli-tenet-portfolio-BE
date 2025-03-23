import z from "zod"
export const createSocialLinksValidator = z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional()
})
export const updateSocialLinksValidator = z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional()
})