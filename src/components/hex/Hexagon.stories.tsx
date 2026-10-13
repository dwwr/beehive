/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Hexagon } from "./Hexagon";
import { HexGrid } from "./HexGrid";

const variants: { name: string; isOn: boolean; outline: boolean }[] = [
  { name: "On", isOn: true, outline: false },
  { name: "Off With Outline", isOn: false, outline: true },
  { name: "Off Without Outline", isOn: false, outline: false },
];

const meta: Meta<typeof Hexagon> = {
  title: "Components/Hex/Hexagon",
  component: Hexagon,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Stories: Story = {
  render: () => (
    <div
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "black",
        boxSizing: "border-box",
        padding: "2rem",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        gap: "0.75rem",
      }}
    >
      {variants.map(({ name, isOn, outline }) => (
        <div
          key={name}
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 0,
          }}
        >
          <div
            style={{
              color: "rgba(255, 255, 255, 0.55)",
              fontFamily: "Helvetica, sans-serif",
              fontSize: "0.75rem",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              marginBottom: "0.35rem",
              textAlign: "center",
            }}
          >
            {name}
          </div>
          <div
            style={{
              width: "130px",
              height: "90px",
              boxSizing: "border-box",
              marginLeft: "-1.75rem",
            }}
          >
            <HexGrid outlineOff={outline}>
              <Hexagon isOn={isOn} text="Emergency" />
            </HexGrid>
          </div>
        </div>
      ))}
    </div>
  ),
};
