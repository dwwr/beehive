"use client";
/** @jsxImportSource @emotion/react */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Hexagon } from "./Hexagon";
import {
  coverageCells,
  DEFAULT_HEX_SIZE,
  type HexCell,
} from "./coords";
import {
  surfaceInnerStyle,
  surfaceLayerStyle,
  surfaceRootStyle,
} from "./hexSurfaceStyles";
import { mainStyle } from "./styles";
import { useHexZoom } from "./useHexZoom";

const HexSurfaceNesting = createContext(false);

export interface HexSurfaceProps {
  hexSize?: number;
  color?: string;
  onHexClick?: (cell: HexCell) => void;
  renderInner?: (cell: HexCell) => ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const HexSurface: React.FC<HexSurfaceProps> = ({
  hexSize = DEFAULT_HEX_SIZE,
  color,
  onHexClick,
  renderInner,
  className,
  style,
}) => {
  const nested = useContext(HexSurfaceNesting);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const selectedIdRef = useRef<string | null>(null);
  const zoomedRef = useRef(false);
  const [bounds, setBounds] = useState({ width: 0, height: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [innerOpen, setInnerOpen] = useState(false);
  const { zoomTo, zoomOut } = useHexZoom(layerRef, surfaceRef);

  useLayoutEffect(() => {
    const el = surfaceRef.current;
    if (!el) return;

    const update = () => {
      setBounds({ width: el.clientWidth, height: el.clientHeight });
    };
    update();

    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cells = useMemo(
    () => coverageCells(bounds.width, bounds.height, hexSize),
    [bounds.height, bounds.width, hexSize],
  );

  const closeZoom = useCallback(() => {
    if (!zoomedRef.current) return;
    zoomedRef.current = false;
    void zoomOut().then(() => {
      setInnerOpen(false);
      selectedIdRef.current = null;
      setSelectedId(null);
    });
  }, [zoomOut]);

  useEffect(() => {
    if (nested) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeZoom();
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [closeZoom, nested]);

  const handleHexClick = useCallback(
    (cell: HexCell, event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      onHexClick?.(cell);

      if (nested) {
        setSelectedId((prev) => (prev === cell.id ? null : cell.id));
        return;
      }

      if (zoomedRef.current && selectedIdRef.current === cell.id) {
        closeZoom();
        return;
      }

      selectedIdRef.current = cell.id;
      setSelectedId(cell.id);
      setInnerOpen(true);
      zoomedRef.current = true;
      void zoomTo(cell.cx, cell.cy, hexSize);
    },
    [closeZoom, hexSize, nested, onHexClick, zoomTo],
  );

  const varStyle = {
    ...style,
    "--s": `${hexSize}px`,
    ...(color ? { "--emergency-color": color } : {}),
  } as CSSProperties;

  return (
    <HexSurfaceNesting.Provider value={true}>
      <div
        ref={surfaceRef}
        css={[mainStyle, surfaceRootStyle]}
        className={className}
        style={varStyle}
        data-outline="true"
      >
        <div ref={layerRef} css={surfaceLayerStyle}>
          {cells.map((cell) => {
            const selected = cell.id === selectedId;
            const inner =
              selected && innerOpen && renderInner ? (
                <div css={surfaceInnerStyle}>{renderInner(cell)}</div>
              ) : (
                false
              );
            return (
              <Hexagon
                key={cell.id}
                isOn={selected}
                onClick={(event) => handleHexClick(cell, event)}
                style={{
                  position: "absolute",
                  left: cell.x,
                  top: cell.y,
                  margin: 0,
                  zIndex: selected ? 3 : 0,
                }}
              >
                {inner}
              </Hexagon>
            );
          })}
        </div>
      </div>
    </HexSurfaceNesting.Provider>
  );
};
