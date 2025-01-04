import * as React from "react";
import { FormField } from "./formField";

interface DynamicFormProps {
  fields: { name: string; label: string }[];
}

export const DynamicForm = ({ fields }: DynamicFormProps) => {
  const [formData, setFormData] = React.useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form>
      {fields.map((field) => (
        <FormField key={field.name} label={field.label} name={field.name} value={formData[field.name] || ""} onChange={handleChange} />
      ))}
    </form>
  );
};
