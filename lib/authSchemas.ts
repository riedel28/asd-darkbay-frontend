import * as z from 'zod';

export const loginSchema = z.object({
  username: z.string().trim().min(1, 'Enter your username.'),
  password: z.string().min(1, 'Enter your password.')
});

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .max(60, 'Username must be at most 60 characters.')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens.'
    ),
  password: z.string().min(8, 'Password must be at least 8 characters.').max(72)
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type RegisterFormValues = z.infer<typeof registerSchema>;
