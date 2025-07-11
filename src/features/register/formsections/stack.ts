import { useState } from "react";

type Status = "pending" | "success" | "fail";
type FieldType = "input" | "dropdown" | "toggle" | "date";

interface ValidationRule<T> {
  func: (v: T, field?: RegisterSchema) => boolean;
  message: string;
}

interface BaseField<T> {
  label: string;
  type: FieldType;
  value: T;
  status: Status;
  validations?: ValidationRule<T>[];
  dependencies?: string[];
  errormessage: string;
}

interface InputField extends BaseField<string> {
  type: "input";
}

interface DropdownField extends BaseField<string> {
  type: "dropdown";
  list: string[];
}

interface ToggleField extends BaseField<boolean> {
  type: "toggle";
}

interface DateField extends BaseField<Date | null> {
  type: "date";
}

type StackField = InputField | DropdownField | ToggleField | DateField;

export type RegisterSchema = Record<string, StackField>;

export interface StackState<T> {
  items: T[];
  addItem: (item: T) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, item: T) => void;
}

export interface UseStackReturn<T extends RegisterSchema> {
  stacks: T[];
  pushStack: () => void;
  popStack: () => void;
  updateStackField: <K extends keyof T>(i: number, key: K, value: T[K]["value"]) => void;
  resetStatus: <K extends keyof T>(i: number, key: K) => void;
  checkError: <K extends keyof T>(i: number, key: K) => void;
  resetStackField: <K extends keyof T>(i: number, key: K) => void;
}

export const useStack = <T extends RegisterSchema>(createInitial: () => T): UseStackReturn<T> => {
  const [stacks, setStacks] = useState<T[]>(() => {
    const initialStack = createInitial();
    const validatedStack = { ...initialStack };

    Object.keys(initialStack).forEach((key) => {
      const field = initialStack[key];
      if (field.validations) {
        let isValid = true;

        // validations 배열을 순회하면서 검사
        for (const validation of field.validations) {
          let result = false;

          if (field.type === "date") {
            const dateValidation = validation as ValidationRule<Date | null>;
            result = dateValidation.func(field.value as Date | null, initialStack);
          } else if (field.type === "toggle") {
            const toggleValidation = validation as ValidationRule<boolean>;
            result = toggleValidation.func(field.value as boolean, initialStack);
          } else {
            const stringValidation = validation as ValidationRule<string>;
            result = stringValidation.func(field.value as string, initialStack);
          }

          if (!result) {
            isValid = false;
            break; // 첫 번째 실패 시 루프 중단
          }
        }

        (validatedStack[key] as any) = {
          ...field,
          status: isValid ? "success" : "",
        };
      }
    });

    return [validatedStack];
  });

  const pushStack = () => setStacks((prev) => [...prev, createInitial()]);
  const popStack = () => setStacks((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));

  const updateStackField = <K extends keyof T>(i: number, key: K, value: T[K]["value"]) => {
    setStacks((prev) =>
      prev.map((stack, idx) =>
        idx === i
          ? {
              ...stack,
              [key]: {
                ...stack[key],
                value,
              } as T[K],
            }
          : stack
      )
    );
  };

  const resetStatus = <K extends keyof T>(i: number, key: K) => {
    setStacks((prev) =>
      prev.map((stack, idx) =>
        idx === i
          ? {
              ...stack,
              [key]: {
                ...stack[key],
                status: "pending" as Status,
              } as T[K],
            }
          : stack
      )
    );
  };

  const checkError = <K extends keyof T>(i: number, key: K) => {
    setStacks((prev) =>
      prev.map((stack, idx) => {
        if (idx !== i) return stack;

        const field = stack[key];
        let isValid = true;

        // validations 배열을 사용한 검증
        if (field.validations) {
          for (const validation of field.validations) {
            let result = false;

            if (field.type === "date") {
              const dateValidation = validation as ValidationRule<Date | null>;
              result = dateValidation.func(field.value as Date | null, stack);
            } else if (field.type === "toggle") {
              const toggleValidation = validation as ValidationRule<boolean>;
              result = toggleValidation.func(field.value as boolean, stack);
            } else {
              const stringValidation = validation as ValidationRule<string>;
              result = stringValidation.func(field.value as string, stack);
            }

            if (!result) {
              isValid = false;
              field.errormessage = validation.message;
              break; // 첫 번째 실패 시 루프 중단
            }
          }
        }

        const updatedStack = {
          ...stack,
          [key]: {
            ...field,
            status: isValid ? "success" : "fail",
          } as T[K],
        };

        // 의존성 필드들 재검증
        const dependentFields = field.dependencies || [];
        dependentFields.forEach((depFieldKey) => {
          const depField = updatedStack[depFieldKey as keyof T];
          if (depField && depField.validations) {
            let depIsValid = true;

            for (const validation of depField.validations) {
              let result = false;

              if (depField.type === "date") {
                const dateValidation = validation as ValidationRule<Date | null>;
                result = dateValidation.func(depField.value as Date | null, updatedStack);
              } else if (depField.type === "toggle") {
                const toggleValidation = validation as ValidationRule<boolean>;
                result = toggleValidation.func(depField.value as boolean, updatedStack);
              } else {
                const stringValidation = validation as ValidationRule<string>;
                result = stringValidation.func(depField.value as string, updatedStack);
              }

              if (!result) {
                depIsValid = false;
                depField.errormessage = validation.message;
                break;
              }
            }

            (updatedStack[depFieldKey as keyof T] as any) = {
              ...depField,
              status: depIsValid ? "success" : "fail",
            };
          }
        });

        return updatedStack;
      })
    );
  };

  // 특정 스택의 특정 필드 값을 초기화
  const resetStackField = <K extends keyof T>(i: number, key: K) => {
    const initialStack = createInitial();
    const initialField = initialStack[key];

    setStacks((prev) =>
      prev.map((stack, idx) =>
        idx === i
          ? {
              ...stack,
              [key]: {
                ...stack[key],
                value: initialField.value,
              } as T[K],
            }
          : stack
      )
    );
  };

  return {
    stacks,
    pushStack,
    popStack,
    updateStackField,
    resetStatus,
    checkError,
    resetStackField,
  };
};

// === 스키마들 ===

export const createInitialCareerSchema = (): RegisterSchema => ({
  company: {
    label: "회사명",
    type: "input",
    value: "",
    status: "pending",
    errormessage: "",
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "회사명을 입력해주세요.",
      },
    ],
  },
  department: {
    label: "근무부서",
    type: "input",
    value: "",
    status: "pending",
    errormessage: "",
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "근무부서를 입력해주세요.",
      },
    ],
  },
  role: {
    label: "직책",
    type: "dropdown",
    value: "",
    status: "pending",
    errormessage: "",
    list: ["팀원", "팀장", "파트장", "임원"],
    validations: [
      {
        func: (v: string) => v !== "",
        message: "직책을 선택해주세요.",
      },
    ],
  },
  isWorking: {
    label: "재직중",
    type: "toggle",
    value: true,
    status: "success",
    errormessage: "",
    dependencies: ["endDate"],
  },
  startDate: {
    label: "입사 년월",
    type: "date",
    value: null,
    errormessage: "",
    status: "pending",
    dependencies: ["endDate"],
    validations: [
      {
        func: (v: Date | null, form) => {
          const endDate = form?.endDate?.value;
          if (!v) return false;
          if (endDate && v > endDate) return false;
          return true;
        },
        message: "입사 년월을 올바르게 입력해주세요.",
      },
    ],
  },
  endDate: {
    label: "퇴사 년월",
    type: "date",
    value: null,
    status: "success",
    errormessage: "",
    validations: [
      {
        func: (v: Date | null, form) => {
          const isWorking = form?.isWorking?.value;
          if (isWorking) return true;
          if (!v) return false;
          const startDate = form?.startDate?.value;
          if (startDate && v < startDate) return false;
          return true;
        },
        message: "퇴사 년월을 올바르게 입력해주세요.",
      },
    ],
  },
});

export const createInitialCertificateSchema = (): RegisterSchema => ({
  certificateName: {
    label: "자격증명",
    type: "input",
    value: "",
    status: "pending",
    errormessage: "",
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "자격증명을 입력해주세요.",
      },
    ],
  },
  issuer: {
    label: "발행기관",
    type: "input",
    value: "",
    status: "pending",
    errormessage: "",
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "발행기관을 입력해주세요.",
      },
    ],
  },
  passStatus: {
    label: "합격구분",
    type: "dropdown",
    value: "",
    status: "pending",
    errormessage: "",
    list: ["합격", "불합격"],
    dependencies: ["passDate"],
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "합격구분을 선택해주세요.",
      },
    ],
  },
  passDate: {
    label: "합격년월",
    type: "date",
    value: null,
    status: "pending",
    errormessage: "",
    validations: [
      {
        func: (v: Date | null, form) => {
          const passStatus = form?.passStatus?.value;
          if (passStatus === "불합격") return true;
          return v !== null;
        },
        message: "합격년월을 입력해주세요.",
      },
    ],
  },
});

export const createInitialEducationSchema = (): RegisterSchema => ({
  schoolType: {
    label: "대학구분",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["4년제", "2년제", "대학원", "기타"],
    errormessage: "",
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "대학구분을 선택해주세요.",
      },
    ],
  },
  schoolName: {
    label: "학교명",
    type: "input",
    value: "",
    status: "pending",
    errormessage: "",
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "학교명을 입력해주세요.",
      },
    ],
  },
  major: {
    label: "전공",
    type: "input",
    value: "",
    status: "pending",
    errormessage: "",
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "전공을 입력해주세요.",
      },
    ],
  },
  graduationStatus: {
    label: "졸업여부",
    type: "dropdown",
    value: "",
    status: "pending",
    errormessage: "",
    list: ["재학중", "졸업", "졸업예정", "중퇴", "휴학"],
    dependencies: ["graduationDate"],
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "졸업여부를 선택해주세요.",
      },
    ],
  },
  admissionDate: {
    label: "입학연월",
    type: "date",
    value: null,
    status: "pending",
    errormessage: "",
    dependencies: ["graduationDate"],
    validations: [
      {
        func: (v: Date | null) => v !== null,
        message: "입학연월을 입력해주세요.",
      },
    ],
  },
  graduationDate: {
    label: "졸업연월",
    type: "date",
    value: null,
    status: "success",
    errormessage: "",
    validations: [
      {
        func: (v: Date | null, form) => {
          const graduationStatus = form?.graduationStatus?.value;
          if (!graduationStatus || typeof graduationStatus !== "string" || !["졸업", "졸업예정"].includes(graduationStatus)) return true;
          if (!v) return false;
          const startDate = form?.admissionDate?.value;
          if (startDate && v < startDate) return false;
          return true;
        },
        message: "졸업연월을 올바르게 입력해주세요.",
      },
    ],
  },
});

export const createInitialJobSchema = (): RegisterSchema => ({
  jobCategory: {
    label: "직무.직업",
    type: "dropdown",
    value: "",
    status: "pending",
    errormessage: "",
    list: ["개발자", "디자이너", "기획자", "마케터", "영업", "경영", "기타"],
    dependencies: ["jobDetail"],
    validations: [
      {
        func: (v: string) => v.trim().length > 0,
        message: "직무.직업을 선택해주세요.",
      },
    ],
  },
  jobDetail: {
    label: "직무.직업 상세",
    type: "dropdown",
    value: "",
    status: "pending",
    errormessage: "",
    list: ["프론트엔드", "백엔드", "풀스택", "모바일", "UI/UX", "PM", "PO", "QA", "데브옵스", "기타"],
    validations: [
      {
        func: (v: string, form) => {
          const category = form?.jobCategory?.value;
          if (category === "개발자") {
            return ["프론트엔드", "백엔드", "풀스택", "모바일", "데브옵스", "기타"].includes(v);
          }
          if (category === "디자이너") {
            return ["UI/UX", "기타"].includes(v);
          }
          return v.trim().length > 0;
        },
        message: "직무.직업 상세를 올바르게 선택해주세요.",
      },
    ],
  },
});
