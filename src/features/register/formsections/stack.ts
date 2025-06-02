type Status = "pending" | "success" | "fail";
type FieldType = "input" | "dropdown" | "toggle";

interface BaseField<T> {
  label: string;
  type: FieldType;
  value: T;
  status: Status;
  validate?: (v: T) => boolean;
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

type StackField = InputField | DropdownField | ToggleField;

export type RegisterSchema = Record<string, StackField>;

export interface StackState<T> {
  items: T[];
  addItem: (item: T) => void;
  removeItem: (index: number) => void;
  updateItem: (index: number, item: T) => void;
}

import { useState } from "react";

// useStack 훅의 리턴 타입 정의
export interface UseStackReturn<T extends RegisterSchema> {
  stacks: T[];
  pushStack: () => void;
  popStack: () => void;
  updateStackField: <K extends keyof T>(i: number, key: K, value: T[K]["value"]) => void;
  resetStatus: <K extends keyof T>(i: number, key: K) => void;
  checkError: <K extends keyof T>(i: number, key: K) => void;
}

export const useStack = <T extends RegisterSchema>(createInitial: () => T) => {
  const [stacks, setStacks] = useState<T[]>([createInitial()]);

  const pushStack = () => {
    setStacks((prev) => [...prev, createInitial()]);
  };

  const popStack = () => {
    setStacks((prev) => (prev.length > 1 ? prev.slice(0, -1) : prev));
  };

  const updateStackField = <K extends keyof T>(i: number, key: K, value: T[K]["value"]) => {
    setStacks((prev) =>
      prev.map((stack, idx) =>
        idx === i
          ? {
              ...stack,
              [key]: {
                ...stack[key],
                value,
              },
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
                status: "pending",
              },
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
        const isValid = typeof field.value === "boolean" ? true : field.validate?.(field.value) ?? true;

        return {
          ...stack,
          [key]: {
            ...field,
            status: isValid ? "success" : "fail",
          },
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

export const createInitialCareerSchema = (): RegisterSchema => ({
  company: {
    label: "회사명",
    type: "input",
    value: "",
    status: "pending",
    validate: (v) => v.trim().length > 0,
  },
  department: {
    label: "근무부서",
    type: "input",
    value: "",
    status: "pending",
    validate: (v) => v.trim().length > 0,
  },
  isWorking: {
    label: "재직중",
    type: "toggle",
    value: true,
    status: "pending",
  },
  startDate: {
    label: "입사 년월",
    type: "input",
    value: "",
    status: "pending",
    validate: (v) => /^\d{4}-\d{2}$/.test(v),
  },
  endDate: {
    label: "퇴사 년월",
    type: "input",
    value: "",
    status: "pending",
    validate: (v) => /^\d{4}-\d{2}$/.test(v),
  },
  position: {
    label: "직급",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["사원", "대리", "과장", "차장"],
    validate: (v) => v !== "",
  },
  role: {
    label: "직책",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["팀원", "팀장", "임원"],
    validate: (v) => v !== "",
  },
});

export const createInitialCertificateSchema = (): RegisterSchema => ({
  자격증명: {
    label: "자격증명",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  발행기관: {
    label: "발행기관",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  합격구분: {
    label: "합격구분",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["합격", "불합격"],
    validate: (v: string) => v.trim().length > 0,
  },
  합격년월: {
    label: "합격년월",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => /^\d{4}-\d{2}$/.test(v), // YYYY-MM 형식 검증
  },
});

export const createInitialEducationSchema = (): RegisterSchema => ({
  대학구분: {
    label: "대학구분",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["4년제", "2년제", "기타"],
    validate: (v: string) => v.trim().length > 0,
  },
  학교명: {
    label: "학교명",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  전공: {
    label: "전공",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => v.trim().length > 0,
  },
  졸업여부: {
    label: "졸업여부",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["재학중", "안 재학중"],
    validate: (v: string) => v.trim().length > 0,
  },
  입학년월: {
    label: "입학연월",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => /^\d{4}-\d{2}$/.test(v), // YYYY-MM 형식
  },
  졸업년월: {
    label: "졸업연월",
    type: "input",
    value: "",
    status: "pending",
    validate: (v: string) => /^\d{4}-\d{2}$/.test(v), // YYYY-MM 형식
  },
});

export const createInitialJobSchema = (): RegisterSchema => ({
  직업: {
    label: "직무.직업",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["개발자", "디자이너", "기획자", "기타"],
    validate: (v: string) => v.trim().length > 0,
  },
  직무상세: {
    label: "직무.직업 상세",
    type: "dropdown",
    value: "",
    status: "pending",
    list: ["프론트엔드", "백엔드", "UI/UX", "PM", "기타"],
    validate: (v: string) => v.trim().length > 0,
  },
});
