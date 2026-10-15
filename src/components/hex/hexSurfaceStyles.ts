import { css } from "@emotion/react";

export const surfaceRootStyle = css`
  position: relative;
  width: 100%;
  height: 100%;
  filter: none;

  &[data-outline="true"] [data-hex][data-on="false"]:not([data-hex-plain]) {
    background-color: var(--emergency-color);

    &::before {
      content: "";
    }
  }

  [data-hex-plain] {
    background-color: #000;
  }

  [data-hex-plain]::before,
  [data-hex-plain]::after {
    content: none;
  }

  [data-hex-detail] {
    overflow: hidden;
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
  z-index: 3;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #000;
  clip-path: polygon(
    var(--hc) 0,
    calc(100% - var(--hc)) 0,
    100% var(--vc),
    100% calc(100% - var(--vc)),
    calc(100% - var(--hc)) 100%,
    var(--hc) 100%,
    0 calc(100% - var(--vc)),
    0 var(--vc)
  );
`;

export const surfaceInnerScaleStyle = css`
  position: absolute;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: calc(100% * var(--hex-zoom, 1));
  height: calc(100% * var(--hex-zoom, 1));
  transform: translate(-50%, -50%) scale(calc(1 / var(--hex-zoom, 1)));
  transform-origin: center;
  padding: 2.5rem 2.75rem;
`;
