import { UseStackReturn, RegisterSchema } from "./stack";
import { Typography } from "@/shared/components";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";
import { DatePickerField } from "@/shared/components/blocks/datepicker/DatePickerField";
import { Suspense } from "react";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";
import { useEducationStatuses, useEducationLevels } from "../register.service";

const EducationOptions = () => {
  const { data } = useEducationLevels();
  if (!data || !Array.isArray(data)) {
    return null;
  }
  return (
    <>
      {data.map(({ name, description }) => (
        <DropdownItem key={name} value={description}>
          {description}
        </DropdownItem>
      ))}
    </>
  );
};

const EducationStatusOptions = () => {
  const { data } = useEducationStatuses();

  if (!data || !Array.isArray(data)) {
    return null;
  }
  return (
    <>
      {data.map(({ name, description }) => (
        <DropdownItem key={name} value={description}>
          {description}
        </DropdownItem>
      ))}
    </>
  );
};
/*
학력 -> 에러검사 + 졸업,졸업 예정 ,재학중,중퇴,휴학
졸업예정,졸업이 아니면 졸업연월 검증 스킵
*/
export const Education = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError, resetStackField }: UseStackReturn<RegisterSchema>) => {
  return (
    <>
      <section className="m-t-24">
        <div
          style={{
            borderBottom: "1px solid black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            paddingBottom: "10px",
          }}
        >
          <Typography weight="semi-bold">학력</Typography>
          <button type="button" onClick={pushStack}>
            +
          </button>
        </div>

        {stacks.map((stack, i) => (
          <div
            key={i}
            className="register-fieldset"
            style={{
              display: "grid",
              gridTemplateColumns: "160fr 280fr 280fr 160fr 160fr 160fr",
              gap: "8px",
              paddingTop: "24px",
              borderBottom: "1px solid var(--palette-gray-30)",
              marginTop: "16px",
            }}
          >
            {Object.entries(stack).map(([key, field]) => {
              const isError = field.status === "fail";

              return (
                <div key={key}>
                  {field.type === "input" && (
                    <FormField
                      placeholder={field.label}
                      wrapperClass="form-field-wrapper"
                      labelClass="form-field__label"
                      errorClass="text-field__error"
                      inputClass="form-field__input"
                      label={field.label}
                      type={["입학년월", "졸업연월"].includes(key) ? "month" : "text"}
                      name={key}
                      value={field.value}
                      isInvalid={false}
                      onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                      onBlur={() => checkError(i, key as keyof RegisterSchema)}
                      onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                    />
                  )}
                  {field.type === "date" ? (
                    field.label === "입학연월" ? (
                      <DatePickerField
                        labelSize="sm"
                        name={key}
                        label={field.label}
                        selected={field.value ? (field.status === "fail" ? null : new Date(field.value)) : null}
                        onChange={(date) => {
                          updateStackField(i, key as keyof RegisterSchema, date);
                          resetStackField(i, "graduationDate" as keyof RegisterSchema); // 입학 연월 변경 시 졸업연월 초기화
                        }}
                        onBlur={() => checkError(i, key as keyof RegisterSchema)}
                        onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                        isValid={!isError}
                        maxDate={new Date()}
                      />
                    ) : field.label === "졸업연월" ? (
                      <DatePickerField
                        labelSize="sm"
                        name={key}
                        label={field.label}
                        selected={field.value ? (field.status === "fail" ? null : new Date(field.value)) : null}
                        onChange={(date) => {
                          updateStackField(i, key as keyof RegisterSchema, date);
                        }}
                        onBlur={() => checkError(i, key as keyof RegisterSchema)}
                        onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                        isValid={true}
                        minDate={stacks[i].admissionDate?.value ? new Date(stacks[i].admissionDate.value as Date) : undefined}
                        maxDate={new Date()}
                      />
                    ) : null
                  ) : null}

                  {field.type === "dropdown" && "list" in field && (
                    <Dropdown
                      id={`${key}-${i}`}
                      label={field.label}
                      value={field.value}
                      onChange={(val) => {
                        updateStackField(i, key as keyof RegisterSchema, val);
                      }}
                      onBlur={() => checkError(i, key as keyof RegisterSchema)}
                      onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                      hasError={false}
                    >
                      <ErrorBoundary fallback={<h2>Error...</h2>}>
                        <Suspense fallback={<>loading</>}>
                          {field.label === "졸업여부" && <EducationStatusOptions />}
                          {field.label === "대학구분" && <EducationOptions />}
                        </Suspense>
                      </ErrorBoundary>
                    </Dropdown>
                  )}
                </div>
              );
            })}

            {i === stacks.length - 1 && (
              <div style={{ gridColumn: "1 / -1", textAlign: "right", marginTop: "16px" }}>
                <button onClick={popStack} disabled={stacks.length <= 1} className="btn border">
                  삭제
                </button>
              </div>
            )}
          </div>
        ))}
      </section>
    </>
  );
};
