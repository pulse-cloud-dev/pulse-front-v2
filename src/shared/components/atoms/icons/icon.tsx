import { forwardRef } from "react";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { envConst } from "@/shared/constants";

export type IconComponentElement = HTMLImageElement;

export interface IconProps
  extends HTMLAttributes<IconComponentElement>,
    PropsWithChildren {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
}

export const Icon = forwardRef<IconComponentElement, IconProps>(
  (props, forwardedRef) => {
    const { loading = "lazy", src, alt, ...rest } = props;

    const iconUrl =
      import.meta.env.MODE === "production"
        ? `/icons/${src}.svg` // 프로덕션 환경
        : `${envConst.domain}${envConst.port}/icons/${src}.svg`; // 개발 환경

    return (
      <img
        ref={forwardedRef}
        src={iconUrl}
        alt={alt}
        loading={loading}
        {...rest}
      />
    );
  }
);
