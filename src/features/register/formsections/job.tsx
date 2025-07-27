import { UseStackReturn, RegisterSchema } from "./stack";
import { Typography } from "@/shared/components";
import { Dropdown, DropdownItem } from "@/shared/components/blocks/dropdown/dropdown";
import { Suspense } from "react";
import ErrorBoundary from "@/shared/components/blocks/errorboundary/errorBoundary";
import { useCategoryItemList, useCategory } from "../register.service";

const CategoryOptions = () => {
  //하드코딩함 ->에러시에 확인 바람
  const { data } = useCategory("JOB");
  //데이터 값 구조

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

const CategoryItemListOptions = ({ selectedCategoryValue }: { selectedCategoryValue: string }) => {
  const { data: categories } = useCategory("JOB");
  const selectedCategory = categories.find((category) => category.name === selectedCategoryValue);

  const selectedCategoryCode = selectedCategory?.code ?? null;
  const { data: items } = useCategoryItemList(selectedCategoryCode || "");

  if (!selectedCategoryCode || !items || !Array.isArray(items)) {
    return null;
  }

  return (
    <>
      {items.map(({ name, code }) => (
        <DropdownItem key={code} value={name}>
          {name}
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
            return (
              <div key={key} style={{ flex: 1 }}>
                {field.type === "dropdown" && "list" in field && (
                  <Dropdown
                    id={`${key}-${i}`}
                    label={field.label}
                    value={field.value}
                    onChange={(val) => {
                      updateStackField(i, key as keyof RegisterSchema, val);
                    }}
                    onBlur={() => checkError(i, key as keyof RegisterSchema)}
                    onFocus={() => resetStatus(i, key as keyof RegisterSchema)}
                    hasError={false}
                  >
                    <ErrorBoundary fallback={<h2>Error...</h2>}>
                      <Suspense fallback={<>loading</>}>
                        {field.label === "분야" && <CategoryOptions />}
                        {field.label === "분야 상세" && <CategoryItemListOptions selectedCategoryValue={(Object.values(stack).find((f) => f.label === "분야")?.value as string) || ""} />}
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
