import { UseStackReturn, RegisterSchema } from "./stack";
import { Typography } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";
import { Suspense } from "react";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";
import { useCategoryItemList } from "../register.service";

const CategoryCodesOptions = () => {
  //하드코딩함 ->에러시에 확인 바람
  const { data } = useCategoryItemList("JOB");

  if (!data || !Array.isArray(data)) {
    return null;
  }
  return (
    <>
      {data.map(({ name }) => (
        <DropdownItem key={name} value={name}>
          {name}
        </DropdownItem>
      ))}
    </>
  );
};

const CategoryItemListOptions = () => {
  const { data } = useCategoryItemList("JOB");

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
                    <ErrorBoundary fallback={<h2>Error...</h2>}>
                      <Suspense fallback={<>loading</>}>
                        {field.label === "직무.직업" && <CategoryCodesOptions />}
                        {field.label === "직무.직업 상세" && <CategoryItemListOptions />}
                      </Suspense>
                    </ErrorBoundary>
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
