import type { Meta, StoryObj } from "@storybook/react";
import { EditableSpan } from "./EditableSpan";
import { useState } from "react";

const meta: Meta<typeof EditableSpan> = {
  title: "TODOLISTS/EditableSpan",
  component: EditableSpan,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    onChange: {
      description: "Value EditableSpan changed",
    },
  },
  args: { value: "start value" },
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanBaseStory: Story = {};

const EditableSpanWork = () => {
  const [title, setTitle] = useState("try to change");
  return (
    <EditableSpan
      value={title}
      onChange={(newValue) => {
        setTitle(newValue);
      }}
    />
  );
};
export const EditableSpanWorkStory = () => <EditableSpanWork />;
