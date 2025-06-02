import { RegisterSchema, UseStackReturn } from "./stack";
import { Typography } from "@/shared/components";

const getFlexRatio = (key: string) => {
  switch (key) {
    case "company":
      return "0 0 31%";
    case "department":
      return "0 0 31%";
    case "position":
      return "0 0 31%";
    case "role":
      return "0 0 31%";
    case "isWorking":
      return "0 0 4%";
    case "startDate":
    case "endDate":
      return "0 0 14.5%";
    default:
      return "1 1 100%";
  }
};
export const Career = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
  return (
    <>
      <section className="m-t-24">
        <Typography weight="semi-bold">경력</Typography>
        {stacks.map((stack, i) => {
          const isWorking = stack.isWorking.value;

          return (
            <div
              key={i}
              className="register-fieldset"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "24px",
              }}
            >
              {Object.entries(stack).map(([key, field]) => {
                const shouldShow = key !== "endDate" || (key === "endDate" && isWorking === false);
                if (!shouldShow) return null;

                const isError = field.status === "fail";

                return (
                  <div
                    key={key}
                    style={{
                      flex: getFlexRatio(key),
                      marginBottom: "12px",
                    }}
                  >
                    <label className="fs_14_medium" style={{ display: "block", marginBottom: "4px" }}>
                      {field.label}
                    </label>

                    {field.type === "input" && (
                      <>
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                          onBlur={() => checkError(i, key as keyof RegisterSchema)}
                          onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                          style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "10px",
                            height: "48px",
                            border: isError ? "1px solid red" : "1px solid #ccc",
                          }}
                        />
                        {isError && <div style={{ color: "red", marginTop: "4px" }}>입력값 확인해주세요.</div>}
                      </>
                    )}

                    {field.type === "dropdown" && "list" in field && (
                      <select
                        value={field.value}
                        onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                        onBlur={() => checkError(i, key as keyof RegisterSchema)}
                        onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "10px",
                          height: "48px",
                          border: isError ? "1px solid red" : "1px solid #ccc",
                        }}
                      >
                        <option value="">선택하세요</option>
                        {field.list.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}

                    {field.type === "toggle" && <input type="checkbox" checked={field.value} onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.checked)} />}
                  </div>
                );
              })}
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
