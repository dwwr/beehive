/** @jsxImportSource @emotion/react */
import type { ReactNode } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hexagon } from "./Hexagon";
import { HexGrid } from "./HexGrid";

const meta: Meta<typeof HexGrid> = {
  title: "Components/Hex/HexGrid",
  component: HexGrid,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const frame = (node: ReactNode) => (
  <div
    style={{
      width: "100%",
      minHeight: "100vh",
      backgroundColor: "black",
      boxSizing: "border-box",
      padding: "2rem",
    }}
  >
    <div style={{ width: "420px", height: "280px" }}>{node}</div>
  </div>
);

export const StaticGrid: Story = {
  render: () =>
    frame(
      <HexGrid outlineOff>
        {Array.from({ length: 12 }, (_, i) => (
          <Hexagon key={i} isOn={i % 3 === 0} text="Cell" />
        ))}
      </HexGrid>,
    ),
};

export const ThemedOverrides: Story = {
  render: () =>
    frame(
      <HexGrid
        outlineOff
        vars={{ size: "72px", color: "rgb(0, 180, 120)", ratio: "0.9" }}
      >
        {Array.from({ length: 12 }, (_, i) => (
          <Hexagon key={i} isOn={i % 2 === 0} text="Theme" />
        ))}
      </HexGrid>,
    ),
};
