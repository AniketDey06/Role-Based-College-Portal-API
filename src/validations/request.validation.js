import { z } from 'zod';

export const signupPostRequstBodySchema = z.object({
    name: z.string(),
    email: z.string(),
    password: z.string().min(3),
})

export const loginPostRequstBodySchema = z.object({
    email: z.string(),
    password: z.string(),
})

export const createAnnouncementPostRequstBodySchema = z.object({
    title: z.string(),
    description: z.string(),
})

export const createResultPostRequstBodySchema = z.object({
    adminId: z.uuid(),
    studentId: z.uuid(),
    fullMarks: z.string(),
    obtainedMarks: z.string()
})

export const createCourcePostRequstBodySchema = z.object({
    // adminId: z.uuid(),
    facultyId: z.uuid(),
    courseName: z.string(),
})

export const addMaterialToCourcePostRequstBodySchema = z.object({
    // adminId: z.uuid(),
    // courseId: z.uuid(),
    // facultyId: z.uuid(),
    title: z.string(),
    description: z.string().optional(),
    fileUrl: z.string().optional(),
})

export const chngeRolePostRequstSchema = z.object({
    role: z.string().toUpperCase()
})