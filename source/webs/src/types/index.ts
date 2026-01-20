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
