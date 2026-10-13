"use client";
/** @jsxImportSource @emotion/react */

import { forwardRef, type CSSProperties, type ReactNode } from "react";
import { containerStyle, mainStyle } from "./styles";

export interface HexGridVars {
  /** Hex width (CSS length). Maps to `--s`. */
  size?: string;
  /** Fill / accent color. Maps to `--emergency-color`. */
  color?: string;
  /** Height ratio vs width. Maps to `--r`. */
  ratio?: string;
}

export interface HexGridProps {
  children: ReactNode;
  /** Red outline when hexes are off. */
  outlineOff?: boolean;
  /** Mark this grid as a paint host for `useHexagonPaint`. */
  paintHost?: boolean;
  /** CSS custom property overrides for theming. */
  vars?: HexGridVars;
  className?: string;
  style?: CSSProperties;
}

export const HexGrid = forwardRef<HTMLDivElement, HexGridProps>(
  function HexGrid(
    { children, outlineOff = false, paintHost = false, vars, className, style },
    ref,
  ) {
    const varStyle = {
      ...style,
      ...(vars?.size ? { "--s": vars.size } : {}),
      ...(vars?.color ? { "--emergency-color": vars.color } : {}),
      ...(vars?.ratio ? { "--r": vars.ratio } : {}),
    } as CSSProperties;

    return (
      <div css={[mainStyle]} className={className} style={varStyle}>
        <div
          ref={ref}
          css={containerStyle}
          data-outline={outlineOff ? "true" : "false"}
          {...(paintHost ? { "data-hex-paint": true } : {})}
        >
          {children}
        </div>
      </div>
    );
  },
);
