import { RegisterSchema, UseStackReturn } from "./stack";
import { Typography, FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";
import { DatePickerField } from "@/shared/components/blocks/datepicker/DatePickerField";
import { usePassStatus } from "../register.service";
import { Suspense } from "react";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";

const PassStatusOptions = () => {
  const { data } = usePassStatus();

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

export const Certificate = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
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
        <Typography weight="semi-bold">자격증</Typography>
        <button type="button" onClick={pushStack}>
          +
        </button>
      </div>

      {stacks.map((stack, i) => (
        <div key={i} className="register-fieldset certificate-form">
          {Object.entries(stack).map(([key, field]) => {
            const isError = field.status === "fail";
            const commonProps = {
              name: key,
              label: field.label,
              isInvalid: isError,
              errorMessage: isError ? field.errormessage : "",
              onBlur: () => checkError(i, key as keyof RegisterSchema),
              onFocus: () => resetStatus(i, key as keyof RegisterSchema),
            };

            switch (field.type) {
              case "input":
                return (
                  <FormField
                    key={key}
                    {...commonProps}
                    placeholder={field.label}
                    wrapperClass="form-field-wrapper"
                    labelClass="form-field__label"
                    errorClass="text-field__error"
                    inputClass="form-field__input"
                    type={key === "합격년월" ? "month" : "text"}
                    value={field.value}
                    onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                  />
                );

              case "date":
                return (
                  <div key={key}>
                    <DatePickerField isValid={isError ? false : true} {...commonProps} selected={field.value ? new Date(field.value) : null} onChange={(date) => updateStackField(i, key as keyof RegisterSchema, date)} />
                  </div>
                );

              case "dropdown":
                return (
                  "list" in field && (
                    <Dropdown key={key} id={`${key}-${i}`} {...commonProps} value={field.value} onChange={(val) => updateStackField(i, key as keyof RegisterSchema, val)} hasError={isError}>
                      <ErrorBoundary fallback={<h2>Error...</h2>}>
                        <Suspense fallback={<>loading</>}>
                          <PassStatusOptions />
                        </Suspense>
                      </ErrorBoundary>
                    </Dropdown>
                  )
                );

              default:
                return null;
            }
          })}

          {i === stacks.length - 1 && (
            <div className="certificate-footer">
              <button onClick={popStack} disabled={stacks.length <= 1} className="btn border">
                삭제
              </button>
            </div>
          )}
        </div>
      ))}
    </section>
  );
};
