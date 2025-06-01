import { UseStackReturn, RegisterSchema } from "./stack";

export const Education = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
  return (
    <>
      <section>
        <h3>학력</h3>

        {stacks.map((stack, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ccc",
              margin: "10px 0",
              padding: "10px",
              borderRadius: "8px",
            }}
          >
            {Object.entries(stack).map(([key, field]) => {
              const isError = field.status === "fail";

              return (
                <div key={key} style={{ marginBottom: "12px" }}>
                  <label
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
                        type={key === "입학년월" || key === "졸업년월" ? "month" : "text"}
                        value={field.value}
                        onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                        onBlur={() => checkError(i, key as keyof RegisterSchema)}
                        onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                        style={{
                          width: "100%",
                          padding: "8px",
                          borderRadius: "4px",
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
                        borderRadius: "4px",
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
