import { RegisterSchema, UseStackReturn } from "./stack";
import { Typography } from "@/shared/components";
import { FormField } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/dropdown/dropdown";

export const Certificate = ({ stacks, pushStack, popStack, updateStackField, resetStatus, checkError }: UseStackReturn<RegisterSchema>) => {
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
          <Typography weight="semi-bold">자격증</Typography>
          <button onClick={pushStack} className="certificate-add-button">
            +
          </button>
        </div>

        {stacks.map((stack, i) => (
          <div key={i} className="register-fieldset">
            {Object.entries(stack).map(([key, field]) => {
              const isError = field.status === "fail";

              return (
                <div key={key} className="certificate-form">
                  {field.type === "input" ? (
                    <FormField
                      errorClass="text-field__error"
                      labelClass="form-field__label"
                      inputClass="form-field__input"
                      label={field.label}
                      type={key === "합격년월" ? "month" : "text"}
                      name={key}
                      value={field.value}
                      isInvalid={isError}
                      errorMessage={isError ? "입력값을 확인해주세요." : ""}
                      onChange={(e) => updateStackField(i, key as keyof RegisterSchema, e.target.value)}
                      onBlur={() => checkError(i, key as keyof RegisterSchema)}
                      onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                    />
                  ) : (
                    field.type === "dropdown" &&
                    "list" in field && (
                      <Dropdown
                        id={key}
                        label={field.label}
                        value={field.value}
                        onChange={(val) => {
                          updateStackField(i, key as keyof RegisterSchema, val);
                        }}
                        onBlur={() => checkError(i, key as keyof RegisterSchema)}
                        onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                        hasError={isError}
                        errorMessage="입력값을 확인해주세요."
                        className="certificate-dropdown"
                      >
                        {field.list.map((item) => (
                          <DropdownItem key={item} value={item} className="certificate-dropdown-item">
                            {item}
                          </DropdownItem>
                        ))}
                      </Dropdown>
                    )
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </section>

      <div className="certificate-footer">
        <button onClick={popStack} disabled={stacks.length <= 1}>
          마지막 자격증 삭제
        </button>
      </div>
    </>
  );
};
