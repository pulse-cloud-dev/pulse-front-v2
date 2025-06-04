import { RegisterSchema, UseStackReturn } from "./stack";
import { Typography } from "@/shared/components";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/dropdown/dropdown";
// import { Toggle } from "@/shared/components/toggle/toggle";

// 12-column 기준 span 설정
const getGridColumnSpan = (key: string): number => {
  switch (key) {
    case "company":
    case "department":
    case "position":
    case "role":
      return 4; // 31% 기준
    case "isWorking":
      return 1; // 4%
    case "startDate":
    case "endDate":
      return 2; // 14.5%
    default:
      return 12;
  }
};

export const Career = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
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
          <Typography weight="semi-bold">경력</Typography>
          <button onClick={pushStack}>+</button>
        </div>

        {stacks.map((stack, i) => {
          const isWorking = stack.isWorking.value;

          return (
            <div
              key={i}
              className="register-fieldset"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(12, 1fr)",
                gap: "8px",
                marginTop: "16px",
                paddingTop: "24px",
                borderBottom: "1px solid var(--palette-gray-30)",
              }}
            >
              {Object.entries(stack).map(([key, field]) => {
                if (key === "endDate" && isWorking) return null;

                const span = getGridColumnSpan(key);
                const isError = field.status === "fail";

                return (
                  <div key={key} style={{ gridColumn: `span ${span}` }}>
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

                    {/* {field.type === "toggle" && <Toggle label={field.label} checked={field.value} onChange={(checked) => updateStackField(i, key as keyof RegisterSchema, checked)} />} */}
                  </div>
                );
              })}

              {i === stacks.length - 1 && (
                <div style={{ gridColumn: "span 12", textAlign: "right", marginTop: "16px" }}>
                  <button onClick={popStack} disabled={stacks.length <= 1} className="btn border">
                    삭제
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <div style={{ marginTop: "16px" }}>
        <button onClick={pushStack} style={{ marginRight: "10px" }}>
          경력 추가
        </button>
        <button onClick={popStack} disabled={stacks.length <= 1}>
          마지막 경력 삭제
        </button>
      </div>
    </>
  );
};
