import { css } from "@emotion/react";

export const surfaceRootStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  filter: none;

  &[data-outline="true"] [data-hex][data-on="false"] {
    background-color: var(--emergency-color);

    &::before {
      content: "";
    }
  }
`;

export const surfaceLayerStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
  will-change: transform;
`;

export const surfaceInnerStyle = css`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;
