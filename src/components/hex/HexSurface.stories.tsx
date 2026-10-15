/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import type { FormEvent } from "react";
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

const contactFormStyle = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  width: 50%;
  height: 100%;
  margin: 0 auto;
  color: #fff;
  font-family: Helvetica, sans-serif;
`;

const contactLabelStyle = css`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  font-size: 0.75rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
`;

const contactFieldStyle = css`
  box-sizing: border-box;
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.35);
  background: #111;
  color: #fff;
  font: inherit;
  font-size: 1rem;
  letter-spacing: 0.02em;
  padding: 0.65rem 0.75rem;
  outline: none;
  resize: none;

  &:focus {
    border-color: rgba(255, 255, 255, 0.7);
  }
`;

const contactButtonStyle = css`
  margin-top: 0.25rem;
  border: 1px solid #fff;
  background: #fff;
  color: #000;
  font: inherit;
  font-size: 0.85rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding: 0.7rem 0.9rem;
  cursor: pointer;
`;

function ContactForm() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    });
  };

  return (
    <form css={contactFormStyle} onSubmit={onSubmit}>
      <label css={contactLabelStyle}>
        Name
        <input css={contactFieldStyle} name="name" type="text" required />
      </label>
      <label css={contactLabelStyle}>
        Email
        <input css={contactFieldStyle} name="email" type="email" required />
      </label>
      <label css={contactLabelStyle}>
        Message
        <textarea css={contactFieldStyle} name="message" rows={4} required />
      </label>
      <button css={contactButtonStyle} type="submit">
        Send
      </button>
    </form>
  );
}

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
      <HexSurface renderInner={() => <HexSurface hexSize={28} />} />
    </div>
  ),
};

export const ZoomWithContactForm: Story = {
  render: () => (
    <div style={{ width: "100vw", height: "100vh", backgroundColor: "black" }}>
      <HexSurface renderInner={() => <ContactForm />} />
    </div>
  ),
};
