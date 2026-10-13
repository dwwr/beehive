"use client";
/** @jsxImportSource @emotion/react */

import {
  useLayoutEffect,
  useRef,
  type CSSProperties,
  type MouseEventHandler,
  type ReactNode,
} from "react";
import {
  downTriangleStyle,
  hexagonContentStyle,
  hexagonStyle,
  textStyle,
  upTriangleStyle,
} from "./hexagonStyles";

export interface HexagonProps {
  isOn?: boolean;
  text?: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Hexagon: React.FC<HexagonProps> = ({
  isOn = false,
  text,
  children,
  className,
  style,
  onClick,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (!el.closest("[data-hex-paint]")) {
      el.dataset.on = isOn ? "true" : "false";
    }
  }, [isOn]);

  return (
    <div
      ref={rootRef}
      data-hex
      data-on={isOn ? "true" : "false"}
      css={hexagonStyle}
      className={className}
      style={{
        ...style,
        cursor: onClick ? "pointer" : style?.cursor,
      }}
      onClick={onClick}
    >
      <div css={hexagonContentStyle}>
        {children ?? (
          <>
            <div css={upTriangleStyle} />
            {text != null ? <span css={textStyle}>{text}</span> : null}
            <div css={downTriangleStyle} />
          </>
        )}
      </div>
    </div>
  );
};
