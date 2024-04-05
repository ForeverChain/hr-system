import { z } from 'zod';

export const exampleFormSchema = z.object({
    username: z
        .string({
            required_error: '아이디가 없습니다',
            invalid_type_error: '문자를 입력해야 합니다',
        })
        .min(2, '최소 2글자'),
    phone: z
        .number({
            invalid_type_error: '비밀번호가 없습니다 ',
        })
        .min(3, '최소 3개 숫자'),
    email: z
        .string({
            invalid_type_error: '입력해야합니다',
        })
        .email('이메일이 아니다'),
    date: z.date({
        required_error: 'Please select a date and time',
        invalid_type_error: 'thats not date',
    }),
    radioButton: z.string(),
    selectBox: z.string(),
    checkbox: z.boolean(),
    checkboxGroup: z.string().array().optional(),
});
