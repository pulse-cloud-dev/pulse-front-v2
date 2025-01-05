import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import type { FieldConfig, IFormData } from "../types/index.type";

export interface UseFormManagerOptions {
  handleSubmit: (data: IFormData) => void;
}

export function useFormManager(fields: FieldConfig[], options: UseFormManagerOptions) {
  const [formData, setFormData] = useState<IFormData>({});
  const [errors, setErrors] = useState<IFormData>({});

  /**
   * @description Change 핸들러
   * @param {ChangeEvent<HTMLInputElement>} e
   */
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * @description 폼 제출 핸들러
   * @param {FormEvent} e
   */
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // 유효성 검사를 통과한 경우 데이터 제출
      options.handleSubmit(formData);
    }
  };

  /**
   * @description 유효성 검사
   */
  const validateForm = (): boolean => {
    const newErrors: IFormData = {};
    fields.forEach(({ name, label, required }) => {
      if (required && !formData[name]?.trim()) {
        newErrors[name] = `${label} is required.`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    setFormData,
    errors,
    setErrors,

    onChange,
    onSubmit,
  };
}
