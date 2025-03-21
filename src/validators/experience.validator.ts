import z from "zod";

export const createExperienceValidator = z.object({
    title: z.string().nonempty(),
    company: z.string().nonempty(),
    location: z.string().nonempty(),
    startDate: z.string().nonempty(),
    endDate: z.string().optional(),
    description: z.string().nonempty(),
})

export const updateExperienceValidator = z.object({
    title: z.string().nonempty(),
    company: z.string().nonempty(),
    location: z.string().nonempty(),
    startDate: z.string().nonempty(),
    endDate: z.string().optional(),
    description: z.string().nonempty(),
    id: z.string().nonempty(),
})

export const updateManyExperienceValidator = z.array(z.object({
    id: z.string().nonempty(),
    index: z.number()
}))