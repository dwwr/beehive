import { type RefObject, useLayoutEffect } from "react";

const TICK_MS = 100;
const FLASH_MS = 250;
const PHASE_MS = 2000;
const PAUSE_MS = 1000;

export interface UseHexagonPaintOptions {
  containerRef: RefObject<HTMLDivElement | null>;
  numberOfHexagons: number;
  stayOn?: boolean;
  stayOff?: boolean;
  range?: number;
}

const paintHex = (
  el: HTMLElement,
  on: boolean,
  lastOn: Uint8Array,
  index: number
) => {
  const next = on ? 1 : 0;
  if (lastOn[index] === next) return;
  lastOn[index] = next;
  el.dataset.on = on ? "true" : "false";
};

const paintAll = (hexes: HTMLElement[], on: boolean, lastOn: Uint8Array) => {
  for (let i = 0; i < hexes.length; i++) {
    paintHex(hexes[i], on, lastOn, i);
  }
};

export const useHexagonPaint = ({
  containerRef,
  numberOfHexagons,
  stayOn = false,
  stayOff = false,
  range = 3,
}: UseHexagonPaintOptions) => {
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const hexes = Array.from(
      container.querySelectorAll<HTMLElement>("[data-hex]")
    );
    if (hexes.length === 0) return;

    const lastOn = new Uint8Array(hexes.length);

    if (stayOn) {
      paintAll(hexes, true, lastOn);
      return;
    }

    if (stayOff) {
      paintAll(hexes, false, lastOn);
      return;
    }

    const states = new Float64Array(numberOfHexagons);
    let flash = false;
    let hexagonInterval: ReturnType<typeof setInterval> | undefined;
    let flashInterval: ReturnType<typeof setInterval> | undefined;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, ms: number) => {
      const id = setTimeout(fn, ms);
      timeouts.push(id);
      return id;
    };

    const clearHexInterval = () => {
      if (hexagonInterval !== undefined) {
        clearInterval(hexagonInterval);
        hexagonInterval = undefined;
      }
    };

    const clearFlashInterval = () => {
      if (flashInterval !== undefined) {
        clearInterval(flashInterval);
        flashInterval = undefined;
      }
    };

    const resetStates = () => {
      states.fill(0);
    };

    const paintFromStates = () => {
      for (let i = 0; i < hexes.length; i++) {
        paintHex(hexes[i], flash || states[i] >= 1, lastOn, i);
      }
    };

    const startHexagonState = () => {
      hexagonInterval = setInterval(() => {
        for (let i = 0; i < states.length; i++) {
          if (states[i] < 1) {
            const deviation = Math.random() * range * 2 - range;
            states[i] = Math.min(1, states[i] + deviation);
          }
        }
        paintFromStates();
      }, TICK_MS);
    };

    const startFlash = () => {
      flashInterval = setInterval(() => {
        flash = !flash;
        paintFromStates();
      }, FLASH_MS);
    };

    const cycleIntervals = () => {
      flash = false;
      resetStates();
      paintAll(hexes, false, lastOn);
      startHexagonState();

      schedule(() => {
        clearHexInterval();
        resetStates();
        flash = false;
        paintAll(hexes, false, lastOn);
        startFlash();

        schedule(() => {
          clearFlashInterval();
          flash = false;
          resetStates();
          paintAll(hexes, false, lastOn);

          schedule(() => {
            cycleIntervals();
          }, PAUSE_MS);
        }, PHASE_MS);
      }, PHASE_MS);
    };

    cycleIntervals();

    return () => {
      clearHexInterval();
      clearFlashInterval();
      for (const id of timeouts) clearTimeout(id);
    };
  }, [containerRef, numberOfHexagons, stayOn, stayOff, range]);
};
