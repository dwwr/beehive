export const HEX_RATIO = 0.85;
export const HEX_H = 0.25;
export const HEX_V = 0.5;
export const HEX_MV = 2;
export const DEFAULT_HEX_SIZE = 100;

export interface HexPitches {
  pitchX: number;
  pitchY: number;
  width: number;
  height: number;
}

export interface HexCell {
  id: string;
  col: number;
  row: number;
  x: number;
  y: number;
  cx: number;
  cy: number;
}

export function hexPitches(size: number): HexPitches {
  const hc = Math.min(Math.max(HEX_H, 0), 0.5) * size;
  const vc = Math.min(Math.max(HEX_V, 0), 0.5) * size * HEX_RATIO;
  const mh = HEX_MV + (size - 1.75 * hc) / 2;
  return {
    pitchX: size + 2 * mh,
    pitchY: size * HEX_RATIO + 2 * HEX_MV - vc,
    width: size,
    height: size * HEX_RATIO,
  };
}

export function coverageCells(
  width: number,
  height: number,
  size: number,
): HexCell[] {
  if (width <= 0 || height <= 0 || size <= 0) return [];

  const { pitchX, pitchY, width: hexW, height: hexH } = hexPitches(size);
  const originX = -pitchX / 2;
  const originY = -pitchY / 2;
  const cols = Math.ceil(width / pitchX) + 2;
  const rows = Math.ceil(height / pitchY) + 2;
  const cells: HexCell[] = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = originX + col * pitchX + (row % 2) * (pitchX / 2);
      const y = originY + row * pitchY;
      cells.push({
        id: `${col},${row}`,
        col,
        row,
        x,
        y,
        cx: x + hexW / 2,
        cy: y + hexH / 2,
      });
    }
  }

  return cells;
}
