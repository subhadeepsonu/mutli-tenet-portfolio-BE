import z from "zod"
export const createSkillValidator = z.object({
    name: z.string().nonempty(),
})
export const updateSkillValidator = z.object({
    name: z.string().nonempty(),
    id: z.string().nonempty(),
})
