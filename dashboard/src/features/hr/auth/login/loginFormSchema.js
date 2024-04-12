import { z } from 'zod';

export const loginFormSchema = z.object({
    email: z
        .string({
            required_error: 'имейл оруулна уу',
            invalid_type_error: 'имейл оруулна уу',
        })
        .min(2, '최소 2글자'),
    password: z
        .string({
            required_error: 'нууц үг оруулна уу',
            invalid_type_error: 'нууц үг оруулна уу',
        })
        .min(2, '최소 2글자'),
});
