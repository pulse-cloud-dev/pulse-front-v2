import { z } from "zod";

export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .nonempty("이메일을 입력해 주세요.")
      .email("유효한 이메일 형식이 아닙니다."),
    password: z
      .string()
      .min(8, "8자 이상 입력해 주세요.")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])/,
        "숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요."
      ),
    passwordCheck: z.string().nonempty("비밀번호 확인이 필요합니다."),
  })
  .refine((data) => data.password === data.passwordCheck, {
    path: ["passwordCheck"],
    message: "비밀번호가 일치하지 않습니다.",
  });

export type FormValues = z.infer<typeof resetPasswordSchema>;
