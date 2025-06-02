import { RegisterSchema, UseStackReturn } from "./stack";
import { Typography } from "@/shared/components";

export const Certificate = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
  return (
    <>
      <section className="m-t-24">
        <Typography weight="semi-bold">자격증</Typography>

        {stacks.map((stack, i) => (
          <div
            key={i}
            className="register-fieldset"
            style={{
              display: "grid",
              gridTemplateColumns: "460px 460px 160px 160px",
              gap: "8px",
              marginBottom: "24px",
            }}
          >
            {Object.entries(stack).map(([key, field]) => {
              const isError = field.status === "fail";

              return (
                <div key={key}>
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
                        type={key === "합격년월" ? "month" : "text"}
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
                      {isError && <div style={{ color: "red", marginTop: "4px" }}>입력값을 확인해주세요.</div>}
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
          자격증 추가
        </button>
        <button onClick={popStack} disabled={stacks.length <= 1}>
          마지막 자격증 삭제
        </button>
      </div>
    </>
  );
};
