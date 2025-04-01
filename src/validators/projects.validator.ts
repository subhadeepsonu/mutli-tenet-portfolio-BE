import z from "zod";
export const createProjectValidator = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    github: z.string().optional(),
    link: z.string().optional(),
    technologies: z.array(z.string().nonempty()),
})

export const updateProjectValidator = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    github: z.string().optional(),
    website: z.string().optional(),
    technologies: z.array(z.string().nonempty())
})


export const updateManyProjectValidator = z.array(z.object({
    id: z.string().nonempty(),
    index: z.number()
}))