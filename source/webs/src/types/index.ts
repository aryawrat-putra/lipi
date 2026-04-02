import z from "zod";

export const UserSchema = z.object({
    email: z.email('Email is required!').lowercase().trim(),
    password: z.string('Password is required!').min(8).max(16).trim(),
    name: z.string('Name is required!').min(4).max(32).trim(),
    image: z.instanceof(File, { message: "Please upload an image" }).nullable(),
    // use https://www.dicebear.com/introduction/ for avatars
});

export const UserLoginSchema = z.object({
    email: z.email('Email is required!').lowercase().trim(),
    password: z.string('Password is required!').min(8).max(16).trim()
});

export type UserCreate = z.infer<typeof UserSchema>;


export const ProfileUpdateSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    image: z.any().optional(),
})

export const EmailUpdateSchema = z.object({
    email: z.string().email("Enter a valid email address"),
})


export const PasswordUpdateSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((d) => d.newPassword === d.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})