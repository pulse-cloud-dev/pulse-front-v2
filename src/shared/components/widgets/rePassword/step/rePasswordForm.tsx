import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { resetPasswordSchema, FormValues } from "../type/useRePasswordForm";
import { userApis } from "@/networks/apis/user.api";
import { usePageNavigation } from "@/shared/lib/hooks";


export const ResetAccountPasswordStep = ({ onNext, onMain }: { onNext?: () => void; onMain?: () => void }) => {
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors, isSubmitted, touchedFields },
  } = useForm<FormValues>({
    mode: "onSubmit",
    resolver: zodResolver(resetPasswordSchema),
  });
const { goHome } = usePageNavigation();

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;

    try {
      await userApis.resetUserPassword({ email, password });
      alert("비밀번호가 성공적으로 변경되었습니다.");
      onNext?.();
    } catch (error) {
      console.error("비밀번호 재설정 실패:", error);
      alert("비밀번호 변경에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form__find">
      {/* 이메일 */}
      <div>
        <label htmlFor="email">이메일</label>
        <input
          id="email"
          type="email"
          placeholder="ex) id@pulse.com"
          {...register("email")}
          className={`form_find ${isSubmitted && errors.email ? "form_find_border-red-500" : ""}`}
        />
        {errors.email && <p className="form_find_text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password">비밀번호 재설정</label>
        <input
          id="password"
          type="password"
          placeholder="숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요."
          {...register("password")}
          onBlur={() => trigger("password")}
          className={`form_find ${isSubmitted && errors.password ? "form_find_border-red-500" : ""}`}
        />
        {errors.password && <p className="form_find_text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          id="passwordCheck"
          type="password"
          placeholder="입력한 비밀번호를 확인해 주세요."
          {...register("passwordCheck")}
          onBlur={() => trigger("passwordCheck")}
          className={`form_find ${(isSubmitted || touchedFields.passwordCheck) && errors.passwordCheck ? "form_find_border-red-500" : ""}`}
        />
        {errors.passwordCheck && (
          <p className="form_find_text-red-500 text-sm">{errors.passwordCheck.message}</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="w-75 m-t-40 flex_r align_center justify_center gap_8" style={{ margin: "auto" }}>
        <button
          type="button"
          className="find_reset__button"
          onClick={goHome}
        >
          메인으로 이동
        </button>
        <button
          type="submit"
          className="find_submit_button fs_16 btn_l flex1"
        >
          비밀번호 재설정
        </button>
      </div>
    </form>
  );
};
