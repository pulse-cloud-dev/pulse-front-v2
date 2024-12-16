import React from "react";

declare module "*.svg" {
  const content: React.FC<React.SVGAttributes<SVGElement>>;
  export default content;
}

declare global {
  type Id = string | number;
  type ClassName = string;
  type Theme = "dark" | "light";
}
