import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { Icon, Linker } from "@/shared/components/atoms";

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLElement> {
  title: string;
  href: string;
}

const BreadcrumbItem = (props: BreadcrumbItemProps) => {
  return (
    <>
      <Icon src="arrow_down_fff_16" className="breadcrumb_arrow" alt="오른쪽 화살표" />
      <Linker href={`/${props.href}`} className="breadcrumb_anchor">
        {props.title || "제목없음"}
      </Linker>
    </>
  );
};

export interface BreadcrumbProps {
  items: Record<"title" | "href", string>[];
}

export const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>((props, ref) => {
  return (
    <div className="sub_breadcrumb p-15" ref={ref}>
      <Linker href="/" className="breadcrumb_anchor">
        <Icon src="home_fff_16" className="breadcrumb_home" alt="HOME" />
      </Linker>

      {props.items.map((item, index) => (
        <BreadcrumbItem key={`${item.title}-${index}`} title={item.title || "제목없음"} href={item.href} />
      ))}
    </div>
  );
});
