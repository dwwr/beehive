/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

const hexagonClipPath = (offset = 0) => css`
  clip-path: polygon(
    calc(var(--hc) ${offset ? `- ${offset}px` : ""}) 0,
    calc(100% - var(--hc) ${offset ? `+ ${offset}px` : ""}) 0,
    calc(100% ${offset ? `+ ${offset}px` : ""}) var(--vc),
    calc(100% ${offset ? `+ ${offset}px` : ""}) calc(100% - var(--vc)),
    calc(100% - var(--hc) ${offset ? `+ ${offset}px` : ""}) 100%,
    calc(var(--hc) ${offset ? `- ${offset}px` : ""}) 100%,
    ${offset ? `-${offset}px` : "0"} calc(100% - var(--vc)),
    ${offset ? `-${offset - 0.5}px` : "0"} var(--vc)
  );
`;

export const hexagonInnerLayer = css`
  content: "";
  position: absolute;
  background-color: black;
`;

/** Outer box: must be inline-block for shape-outside (Temani / Safari).
 *  On/off is driven by [data-on] so paint hosts can update without React re-renders. */
export const hexagonStyle = css`
  width: var(--s);
  margin: var(--mv) var(--mh);
  height: calc(var(--s) * var(--r));
  display: inline-block;
  vertical-align: top;
  font-size: initial;
  box-sizing: border-box;
  ${hexagonClipPath()};
  margin-bottom: calc(var(--mv) - var(--vc));
  position: relative;
  background-color: black;

  &::before {
    ${hexagonInnerLayer};
    top: 3px;
    left: 3px;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    ${hexagonClipPath(2)};
  }

  /* Plain off = black-on-black inset; skip the layer. Outlined off restores via container. */
  &[data-on="false"]::before {
    content: none;
  }

  &[data-on="true"] {
    background: var(--emergency-color);

    &::after {
      ${hexagonInnerLayer};
      z-index: 1;
      top: 4.5px;
      left: 4.5px;
      width: calc(100% - 9px);
      height: calc(100% - 9px);
      background-color: var(--emergency-color);
      ${hexagonClipPath(3)};
    }
  }
`;

/** Inner flex stack for triangle / label / triangle */
export const hexagonContentStyle = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  gap: 0.45rem;
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 2;
`;

export const textStyle = css`
  z-index: 2;
  font-family: "Helvetica", monospace;
  font-size: 0.65rem;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.04rem;
`;

const commonTriangleStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.85rem;
`;

export const upTriangleStyle = css`
  &::after {
    ${commonTriangleStyle};
    z-index: 2;
    content: "▲";
  }
`;
export const downTriangleStyle = css`
  &::before {
    ${commonTriangleStyle};
    z-index: 2;
    content: "▼";
  }
`;
