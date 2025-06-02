import { UseStackReturn, RegisterSchema } from "./stack";
import { Typography } from "@/shared/components";

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
          }}
        >
          {Object.entries(stack).map(([key, field]) => {
            const isError = field.status === "fail";
            const isPlaceholder = field.value === "";

            return (
              <div key={key} style={{ flex: 1 }}>
                <label
                  className="fs_14_medium "
                  style={{
                    display: "block",
                    marginBottom: "10px",
                  }}
                >
                  {field.label}
                </label>
                <select
                  value={field.value as string}
                  onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                  onBlur={() => checkError(i, key as keyof RegisterSchema)}
                  onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                  style={{
                    color: isPlaceholder ? "gray" : "black",
                    width: "100%",
                    padding: "8px",
                    borderRadius: "10px",
                    height: "48px",
                    border: isError ? "1px solid red" : "1px solid #ccc",
                  }}
                >
                  <option value="" disabled hidden>
                    직무 · 직업 선택
                  </option>
                  {field.type === "dropdown" &&
                    field.list.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                </select>
                {isError && <div style={{ color: "red", marginTop: "4px" }}>입력값을 확인해주세요.</div>}
              </div>
            );
          })}
        </div>
      ))}
    </section>
  );
};
