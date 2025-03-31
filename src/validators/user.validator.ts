import z from 'zod';
export const userLoginValidator = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
export const userRegisterValidator = z.object({
    domain: z.string().regex(/^[a-z0-9]+$/, "Must contain only lowercase letters and numbers.").min(1),
    email: z.string().email(),
    password: z.string().min(6),
});
export const userUpdateValidator = z.object({
    domain: z.string().regex(/^[a-z0-9]+$/, "Must contain only lowercase letters and numbers.").min(1),
    bio: z.string(),
    theme: z.enum(['light', 'dark', 'retro']),
    github: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    linkedin: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
    twitter: z.string().url({ message: "Please enter a valid URL" }).optional().or(z.literal("")),
});