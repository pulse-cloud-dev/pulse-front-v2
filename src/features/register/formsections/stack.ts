import { useState } from "react";

type Status = "pending" | "success" | "fail";
type FieldType = "input" | "dropdown" | "toggle" | "date";

interface BaseField<T> {
  label: string;
  type: FieldType;
  value: T;
  status: Status;
  validate?: (v: T, field?: RegisterSchema) => boolean;
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
}

export const useStack = <T extends RegisterSchema>(createInitial: () => T): UseStackReturn<T> => {
  const [stacks, setStacks] = useState<T[]>([createInitial()]);

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

        if (field.validate) {
          // 타입 안전성을 위해 각 필드 타입별로 검증
          if (field.type === "date") {
            isValid = field.validate(field.value as Date | null, stack);
          } else if (field.type === "toggle") {
            isValid = field.validate(field.value as boolean, stack);
          } else {
            isValid = field.validate(field.value as string, stack);
          }
        }

        return {
          ...stack,
          [key]: {
            ...field,
            status: isValid ? "success" : "fail",
          } as T[K],
        };
      })
    );
  };

  return {
    stacks,
    pushStack,
    popStack,
    updateStackField,
    resetStatus,
    checkError,
  };
};

// === 스키마들 ===

export const createInitialCareerSchema = (): RegisterSchema => ({
  company: {
    label: "회사명",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  department: {
    label: "근무부서",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  role: {
    label: "직책",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["팀원", "팀장", "파트장", "임원"],
    validate: (v: string) => v !== "",
  },
  isWorking: {
    label: "재직중",
    type: "toggle",
    value: false,
    status: "pending",
  },
  startDate: {
    label: "입사 년월",
    type: "date",
    value: null,
    status: "pending",
    validate: (v: Date | null, form) => {
      const endDate = form?.endDate?.value;
      if (!v) return false; // 필수값
      if (endDate && v > endDate) return false;
      return true;
    },
  },
  endDate: {
    label: "퇴사 년월",
    type: "date",
    value: null,
    status: "pending",
    validate: (v: Date | null, form) => {
      if (!v) return true; // 재직 중이면 null 허용
      const startDate = form?.startDate?.value;
      if (startDate && v < startDate) return false;
      return true;
    },
  },
});

export const createInitialCertificateSchema = (): RegisterSchema => ({
  certificateName: {
    label: "자격증명",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  issuer: {
    label: "발행기관",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  passStatus: {
    label: "합격구분",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["합격", "불합격"],
    validate: (v: string) => v.trim().length > 0,
  },
  passDate: {
    label: "합격년월",
    type: "date",
    value: null,
    status: "pending",
    validate: (v: Date | null) => v !== null,
  },
});

export const createInitialEducationSchema = (): RegisterSchema => ({
  schoolType: {
    label: "대학구분",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["4년제", "2년제", "대학원", "기타"],
    validate: (v: string) => v.trim().length > 0,
  },
  schoolName: {
    label: "학교명",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  major: {
    label: "전공",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  graduationStatus: {
    label: "졸업여부",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["재학중", "졸업", "졸업예정", "중퇴", "휴학"],
    validate: (v: string) => v.trim().length > 0,
  },
  admissionDate: {
    label: "입학연월",
    type: "date",
    value: null,
    status: "pending",
    validate: (v: Date | null) => v !== null,
  },
  graduationDate: {
    label: "졸업연월",
    type: "date",
    value: null,
    status: "pending",
    validate: (v: Date | null, form) => {
      if (!v) return false;
      const startDate = form?.admissionDate?.value;
      if (startDate && v < startDate) return false;
      return true;
    },
  },
});

export const createInitialJobSchema = (): RegisterSchema => ({
  jobCategory: {
    label: "직무.직업",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["개발자", "디자이너", "기획자", "마케터", "영업", "경영", "기타"],
    validate: (v: string) => v.trim().length > 0,
  },
  jobDetail: {
    label: "직무.직업 상세",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["프론트엔드", "백엔드", "풀스택", "모바일", "UI/UX", "PM", "PO", "QA", "데브옵스", "기타"],
    validate: (v: string) => v.trim().length > 0,
  },
});
