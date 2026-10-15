"use client";

import { animate } from "animejs";
import { useCallback, useRef, type RefObject } from "react";
import { hexPitches } from "./coords";

export const ZOOM_MS = 800;
export const ZOOM_FILL = 0.9;

export interface HexZoomMetrics {
  scale: number;
  hexW: number;
  hexH: number;
}

export function useHexZoom(
  layerRef: RefObject<HTMLDivElement | null>,
  surfaceRef: RefObject<HTMLDivElement | null>,
) {
  const currentRef = useRef<ReturnType<typeof animate> | null>(null);

  const stop = useCallback(() => {
    currentRef.current?.pause();
    currentRef.current = null;
  }, []);

  const zoomTo = useCallback(
    (cx: number, cy: number, size: number): Promise<HexZoomMetrics | null> => {
      const layer = layerRef.current;
      const surface = surfaceRef.current;
      if (!layer || !surface) return Promise.resolve(null);

      const { width: hexW, height: hexH } = hexPitches(size);
      const sw = surface.clientWidth;
      const sh = surface.clientHeight;
      if (sw <= 0 || sh <= 0 || hexW <= 0 || hexH <= 0) {
        return Promise.resolve(null);
      }

      const scale = Math.min(sw / hexW, sh / hexH) * ZOOM_FILL;
      const metrics: HexZoomMetrics = { scale, hexW, hexH };
      stop();
      const animation = animate(layer, {
        translateX: sw / 2 - cx * scale,
        translateY: sh / 2 - cy * scale,
        scale,
        duration: ZOOM_MS,
        ease: "inOutQuad",
      });
      currentRef.current = animation;
      return animation.then(() => metrics);
    },
    [layerRef, surfaceRef, stop],
  );

  const zoomOut = useCallback(() => {
    const layer = layerRef.current;
    if (!layer) return Promise.resolve();

    stop();
    const animation = animate(layer, {
      translateX: 0,
      translateY: 0,
      scale: 1,
      duration: ZOOM_MS,
      ease: "inOutQuad",
    });
    currentRef.current = animation;
    return animation.then(() => undefined);
  }, [layerRef, stop]);

  return { zoomTo, zoomOut };
}
