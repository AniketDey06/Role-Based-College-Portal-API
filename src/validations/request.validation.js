import { z } from 'zod';

export const signupPostRequstBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(3),
})