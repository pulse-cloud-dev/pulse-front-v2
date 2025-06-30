import type { ViewEventProps, Void } from "@/shared/types";
import { Icon, Linker } from "@/shared/components";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email("올바른 이메일 형식이 아닙니다."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

type FormValues = z.infer<typeof signInSchema>;

const SignInDynamicForm = ({ handleSubmit }: { handleSubmit: Void }) => {
  const {
    register,
    handleSubmit: hookHandleSubmit,
    formState: { errors, isSubmitted },
  } = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = (data: FormValues) => {
    handleSubmit(data);
  };

  return (
    <form onSubmit={hookHandleSubmit(onSubmit)} className="form-auth" noValidate>
      <div>
        <input {...register("email")} id="email" type="email" placeholder="이메일" aria-invalid={!!errors.email} aria-describedby="email-error" className={`${isSubmitted && errors.email ? "form-auth__border" : ""}`} />
        {errors.email && (
          <p id="email-error" className="form-auth__error-message text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <input {...register("password")} id="password" type="password" placeholder="비밀번호" aria-invalid={!!errors.password} aria-describedby="password-error" />
        {errors.password && (
          <p id="password-error" className="form-auth__error-message text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex_r justify_space-between">
        <span className="fs_12 color__grayscale-50">로그인 상태 유지</span>
        <span>
          <Linker href="/auth/find-password" className="fs_12 color__grayscale-50">
            계정/비밀번호 찾기
          </Linker>
        </span>
      </div>

      <button type="submit" className="auth__button">
        로그인
      </button>
    </form>
  );
};

interface SignInViewProps extends ViewEventProps {}

export const SignInView = (props: SignInViewProps) => {
  return (
    <article className="sub-layout__content">
      <section className="section__auth">
        <div className="container__signIn">
          <Linker href="/" className="align_center">
            <Icon src="logo_02" alt="logo" className="logo" />
          </Linker>

          {/* Sign-in Form */}
          <SignInDynamicForm handleSubmit={props.event?.handleSubmit!} />
          {/* Sign-in Form */}

          <div className="flex_r align_center">
            <span className="fs_14">
              아직 회원이 아니신가요?{" "}
              <Linker href="/auth/sign-up" className="color__primary-70 fw_700">
                회원가입
              </Linker>
            </span>
          </div>

          {/* Bottom line */}
          <div className="flex_r align_center m-t-40 terms">
            <Linker href="/terms-and-conditions-for-service">이용약관</Linker>
            <Linker href="/privacy-policy-for-users">개인정보방침</Linker>
            <Linker href="/customer-support-faq">고객센터</Linker>
          </div>
          {/* Bottom line */}
        </div>
      </section>
    </article>
  );
};
