import { UseStackReturn, RegisterSchema } from "./stack";
import { Typography } from "@/shared/components";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/dropdown/dropdown";

export const Job = ({ stacks, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
  return (
    <section>
      <Typography weight="semi-bold">직업</Typography>
      {stacks.map((stack, i) => (
        <div
          key={i}
          className="register-fieldset"
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "8px",
            marginTop: "10px",
          }}
        >
          {Object.entries(stack).map(([key, field]) => {
            const isError = field.status === "fail";

            return (
              <div key={key} style={{ flex: 1 }}>
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
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
};
