/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { HexSurface } from "./HexSurface";

const meta: Meta<typeof HexSurface> = {
  title: "Components/Hex/HexSurface",
  component: HexSurface,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Cover: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <HexSurface />
    </div>
  ),
};

export const CoverFramed: Story = {
  render: () => (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
        boxSizing: "border-box",
        padding: "2rem",
      }}
    >
      <div style={{ width: "420px", height: "280px" }}>
        <HexSurface hexSize={72} />
      </div>
    </div>
  ),
};

export const ClickSelect: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <HexSurface />
    </div>
  ),
};

export const Zoom: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <HexSurface />
    </div>
  ),
};

export const ZoomWithInnerGrid: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <HexSurface
        renderInner={() => <HexSurface hexSize={28} />}
      />
    </div>
  ),
};
