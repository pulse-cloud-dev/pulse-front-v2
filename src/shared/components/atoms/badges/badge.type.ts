import type { HTMLAttributes, PropsWithChildren } from "react";

export type BadgeElement = HTMLAttributes<HTMLElement & HTMLDivElement>;
export type BadgeProps = BadgeElement & PropsWithChildren;
