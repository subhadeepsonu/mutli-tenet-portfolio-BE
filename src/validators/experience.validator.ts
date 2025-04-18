import z from "zod";


export const createExperienceValidator = z.object({
    title: z.string().nonempty(),
    company: z.string().nonempty(),
    location: z.string().nonempty(),
    position: z.string().nonempty(),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
    description: z.string().nonempty(),
});

export const updateExperienceValidator = z.object({
    title: z.string().nonempty(),
    company: z.string().nonempty(),
    location: z.string().nonempty(),
    position: z.string().nonempty(),
    startDate: z.string().transform((str) => new Date(str)),
    endDate: z.string().optional().transform((str) => (str ? new Date(str) : undefined)).nullable(),
    description: z.string().nonempty()
})

export const updateManyExperienceValidator = z.array(z.object({
    id: z.string().nonempty(),
    index: z.number()
}))