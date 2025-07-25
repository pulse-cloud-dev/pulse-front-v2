import type { PropsWithChildren, ButtonHTMLAttributes } from "react";
import { forwardRef } from "react";

/**
 * `BaseButton`은 다양한 크기와 색상 옵션을 제공하는 기본 버튼 컴포넌트입니다.
 *
 * @param {BaseButtonProps} props - 버튼에 전달할 속성들
 * @param {React.Ref<HTMLButtonElement>} ref - 버튼에 전달되는 ref
 *
 * @example
 * ```tsx
 * <BaseButton color="teal" size="md">확인</BaseButton>
 * <BaseButton color="outlined" disabled>비활성</BaseButton>
 * ```
 *
 * @remarks
 * 주요 color 옵션:
 * - `teal`: 기본 사용 색상 (배경 Teal, 흰색 글자)
 * - `outlined`: 테두리형 버튼 (민트 테두리 + 텍스트만 컬러)
 * - `secondary`: 민트 텍스트, hover 시 연한 배경
 * - selected: 선택시에 secondary의 hover와 같은 색상(디자인 시스템 select참고)
 * 주요 size 옵션:
 * - `"sm"`, `"md"`, `"lg"`
 */

type BaseButtonProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: "gray" | "bk" | "wh" | "default" | "primary" | "reverse" | "teal" | "outlined" | "secondary" | "selected";
};

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, forwardedRef) => {
  const { className, size = "md", color = "default", style, children, ...restProps } = props;
  return (
    <button ref={forwardedRef} className={`btn btn--base ${size} ${color} ${className}`} style={style} {...restProps}>
      {children}
    </button>
  );
});
