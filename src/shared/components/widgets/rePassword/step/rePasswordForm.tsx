import { useForm } from "react-hook-form";
import { FormValues } from "../type/useRePasswordForm";
import { userApis } from "@/networks/apis/user.api";

export const ResetAccountPasswordStep = ({ onNext, onMain }: { onNext?: () => void; onMain?: () => void }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    trigger,
    formState: { errors, isSubmitted, touchedFields },
  } = useForm<FormValues>({
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = async (data: FormValues) => {
    const { email, password, passwordCheck } = data;

    if (password !== passwordCheck) {
      setError("passwordCheck", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
      return;
    }

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
        <label htmlFor="email" >이메일</label>
        <input
          id="email"
          type="email"
          placeholder="ex) id@pulse.com"
          {...register("email", {
            required: "이메일을 입력해 주세요.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "유효한 이메일 형식이 아닙니다.",
            },
          })}
          className={`form_find ${
            isSubmitted && errors.email ? "form_find_border-red-500" : ""
          }`}
        />
        {isSubmitted && errors.email && <p className="form_find_text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      {/* 비밀번호 */}
      <div>
        <label htmlFor="password">비밀번호 재설정</label>
        <input
          id="password"
          type="password"
          placeholder="숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요."
          {...register("password", {
            required: "비밀번호를 입력해 주세요.",
            minLength: {
              value: 8,
              message: "8자 이상 입력해 주세요.",
            },
            pattern: {
              value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
              message: "숫자, 영문, 특수문자 포함 8자 이상 작성해 주세요.",
            },
          })}
          onBlur={() => trigger("password")} //포커스를 잃었을 때 일치여부 검사
          className={`form_find ${
            isSubmitted && errors.password ? "form_find_border-red-500" : ""
          }`}
        />
        {isSubmitted && errors.password && <p className="form_find_text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      {/* 비밀번호 확인 */}
      <div>
        <label htmlFor="passwordCheck">비밀번호 확인</label>
        <input
          id="passwordCheck"
          type="password"
          placeholder="입력한 비밀번호를 확인해 주세요."
          {...register("passwordCheck", {
            required: "비밀번호 확인이 필요합니다.",
            validate: (val) =>
              val === password || "비밀번호가 일치하지 않습니다.",
          })}
          onBlur={() => trigger("passwordCheck")} 
          className={`form_find ${
            (isSubmitted || touchedFields.passwordCheck) && errors.passwordCheck ? "form_find_border-red-500" : ""
          }`}
        />
        {isSubmitted && errors.passwordCheck && (
          <p className="form_find_text-red-500 text-sm">{errors.passwordCheck.message}</p>
        )}
      </div>

      {/* 버튼 */}
      <div className="w-75 m-t-40 flex_r align_center justify_center gap_8" style={{ margin: "auto" }}>
        <button
          type="button"
          className="find_reset__button"
          onClick={() => window.location.href = "/"}
        >
          메인으로 이동
        </button>
        <button
          type="submit"
          className="find_submit_button fs_16 btn_l flex1 "
        >
          비밀번호 재설정
        </button>
      </div>
    </form>
  );
};
