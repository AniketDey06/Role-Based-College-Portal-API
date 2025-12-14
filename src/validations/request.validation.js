import { z } from 'zod';

export const signupPostRequstBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(3),
})

export const loginPostBodySchema = z.object({
    email: z.string(),
    password: z.string(),
})