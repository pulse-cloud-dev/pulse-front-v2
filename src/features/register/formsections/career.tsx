import { RegisterSchema, UseStackReturn } from "./stack";
import { Typography } from "@/shared/components";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";
import { DatePickerField } from "@/shared/components/blocks/datepicker/DatePickerField";
import ToggleBtn from "@/shared/components/blocks/togglebutton/togglebutton";
import { useRoleLevels } from "../register.service";
import { Suspense } from "react";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";

const RoleLevelOptions = () => {
  const { data } = useRoleLevels();

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
const careerGridStyle = {
  display: "grid",
  gridTemplateColumns: "263fr 263fr 263fr  90fr 180fr 180fr",
  gap: "8px",
  alignItems: "bottom",
  marginTop: "16px",
  padding: "16px 0",
  borderBottom: "1px solid #eee",
};

const careerFieldStyle = {
  minWidth: 0,
};

const deleteButtonStyle = {
  gridColumn: "1 / -1",
  textAlign: "right" as const,
  marginTop: "16px",
};

export const Career = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError, resetStackField }: UseStackReturn<RegisterSchema>) => {
  return (
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
        <Typography weight="semi-bold">경력</Typography>
        <button type="button" onClick={pushStack}>
          +
        </button>
      </div>

      {stacks.map((stack, i) => {
        const isWorking = stack.isWorking.value;

        return (
          <div key={i} style={careerGridStyle}>
            {Object.entries(stack).map(([key, field]) => {
              if (key === "endDate" && isWorking) return null;

              const isError = field.status === "fail";

              return (
                <div key={key} style={careerFieldStyle}>
                  {field.type === "date" ? (
                    field.label === "입사년월" ? (
                      <DatePickerField
                        labelSize="sm"
                        name={key}
                        label={field.label}
                        selected={field.value ? (field.status === "fail" ? null : new Date(field.value)) : null}
                        onChange={(date) => {
                          updateStackField(i, key as keyof RegisterSchema, date);
                          resetStackField(i, "endDate" as keyof RegisterSchema); // 입사 년월 변경 시 퇴사 년월 상태 초기화
                        }}
                        onBlur={() => {
                          checkError(i, key as keyof RegisterSchema);
                        }}
                        onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                        error={isError ? field.errormessage : ""}
                        isValid={!isError}
                        maxDate={new Date()}
                      />
                    ) : field.label === "퇴사년월" ? (
                      <DatePickerField
                        labelSize="sm"
                        name={key}
                        label={field.label}
                        selected={field.value ? (field.status === "fail" ? null : new Date(field.value)) : null}
                        onChange={(date) => {
                          updateStackField(i, key as keyof RegisterSchema, date);
                        }}
                        onBlur={() => {
                          checkError(i, key as keyof RegisterSchema);
                        }}
                        onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                        error={isError ? field.errormessage : ""}
                        isValid={!isError}
                        minDate={
                          stacks[i].startDate?.value // 입사 년월이 있으면 minDate 지정
                            ? new Date(stacks[i].startDate.value as Date)
                            : undefined // 없으면 제한 없이 선택
                        }
                        maxDate={new Date()}
                      />
                    ) : null
                  ) : null}

                  {field.type === "input" && (
                    <FormField
                      placeholder={field.label}
                      label={field.label}
                      wrapperClass="form-field-wrapper"
                      labelClass="form-field__label"
                      errorClass="text-field__error"
                      inputClass="form-field__input"
                      type={["startDate", "endDate"].includes(key) ? "month" : "text"}
                      name={key}
                      value={field.value}
                      isInvalid={false}
                      onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                      onBlur={() => checkError(i, key as keyof RegisterSchema)}
                      onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                    />
                  )}

                  {field.type === "dropdown" && "list" in field && (
                    <Dropdown
                      id={`${key}-${i}`}
                      label={field.label}
                      value={field.value}
                      onChange={(val) => updateStackField(i, key as keyof RegisterSchema, val)}
                      onBlur={() => checkError(i, key as keyof RegisterSchema)}
                      onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                      hasError={false}
                    >
                      <ErrorBoundary fallback={<h2>Error...</h2>}>
                        <Suspense fallback={<>loading</>}>
                          <RoleLevelOptions />
                        </Suspense>
                      </ErrorBoundary>
                    </Dropdown>
                  )}

                  {field.type === "toggle" && <ToggleBtn isOn={field.value} onToggle={(checked: boolean) => updateStackField(i, key as keyof RegisterSchema, checked)} />}
                </div>
              );
            })}

            {i === stacks.length - 1 && (
              <div style={deleteButtonStyle}>
                <button onClick={popStack} disabled={stacks.length <= 1} className="btn border">
                  삭제
                </button>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};
