import { RegisterSchema, UseStackReturn } from "./stack";
import { Typography } from "@/shared/components";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";
import { DatePickerField } from "@/shared/components/blocks/datepicker/DatePickerField";
import ToggleBtn from "@/shared/components/blocks/togglebutton/togglebutton";

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

export const Career = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
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
        <button onClick={pushStack}>+</button>
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
                    <DatePickerField
                      labelClass="form-field__label"
                      inputClass="form-field__input m-t-4"
                      id={`${key}-${i}`}
                      name={key}
                      label={field.label}
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => updateStackField(i, key as keyof RegisterSchema, date)}
                      onBlur={() => checkError(i, key as keyof RegisterSchema)}
                      onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                      isInvalid={isError}
                      errorMessage={isError ? "입력값을 확인해주세요." : ""}
                    />
                  ) : null}

                  {field.type === "input" && (
                    <FormField
                      label={field.label}
                      labelClass="form-field__label"
                      errorClass="text-field__error"
                      inputClass="form-field__input"
                      type={["startDate", "endDate"].includes(key) ? "month" : "text"}
                      name={key}
                      value={field.value}
                      isInvalid={isError}
                      errorMessage={isError ? "입력값을 확인해주세요." : ""}
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
                      hasError={isError}
                      errorMessage="입력값을 확인해주세요."
                    >
                      {field.list.map((item) => (
                        <DropdownItem key={item} value={item}>
                          {item}
                        </DropdownItem>
                      ))}
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
