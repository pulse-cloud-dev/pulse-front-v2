import { forwardRef } from "react";
import type { HTMLAttributes, PropsWithChildren } from "react";
import { envConst } from "@/shared/constants";

export type ImageComponentElement = HTMLImageElement;

export interface ImageProps extends HTMLAttributes<ImageComponentElement>, PropsWithChildren {
  src: string;
  alt: string;
  loading?: "lazy" | "eager";
}

export const Image = forwardRef<ImageComponentElement, ImageProps>((props, forwardedRef) => {
  const { loading = "lazy", src, alt, ...rest } = props;

  const iconUrl = `${envConst.domain}${envConst.port}/images/${src}.png`;

  return <img ref={forwardedRef} src={iconUrl} alt={alt} loading={loading} {...rest} />;
});
