import { UseStackReturn, RegisterSchema } from "./stack";
import { Typography } from "@/shared/components";

const getFlexRatio = (key: string) => {
  switch (key) {
    case "대학구분":
      return "0 0 12.9%";
    case "학교명":
      return "0 0 23%";
    case "전공":
      return "0 0 23%";
    case "졸업여부":
      return "0 0 12%";
    case "입학년월":
      return "0 0 10%";
    case "졸업년월":
      return "0 0 10%";
    default:
      return "1 1 100%";
  }
};

export const Education = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
  return (
    <>
      <section className="m-t-24">
        <Typography weight="semi-bold">학력</Typography>
        {stacks.map((stack, i) => (
          <div
            key={i}
            className="register-fieldset"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              marginBottom: "24px",
              paddingTop: "24px",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--palette-gray-30)",
              width: "100%",
              marginTop: "16px",
              borderTop: i === 0 ? "1px solid #000" : undefined,
            }}
          >
            {Object.entries(stack).map(([key, field]) => {
              const isError = field.status === "fail";

              return (
                <div
                  key={key}
                  style={{
                    flex: getFlexRatio(key),
                    marginBottom: "12px",
                  }}
                >
                  <label
                    className="fs_14_medium"
                    style={{
                      display: "block",
                      marginBottom: "4px",
                      fontWeight: "bold",
                    }}
                  >
                    {field.label}
                  </label>

                  {field.type === "input" && (
                    <>
                      <input
                        type={["입학년월", "졸업년월"].includes(key) ? "month" : "text"}
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
                </div>
              );
            })}
          </div>
        ))}
      </section>

      <div style={{ marginTop: "16px" }}>
        <button onClick={pushStack} style={{ marginRight: "10px" }}>
          학력 추가
        </button>
        <button onClick={popStack} disabled={stacks.length <= 1}>
          마지막 학력 삭제
        </button>
      </div>
    </>
  );
};
