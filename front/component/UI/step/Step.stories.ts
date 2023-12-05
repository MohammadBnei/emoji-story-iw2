import type { Meta, StoryObj } from "@storybook/react";

import Step from "./Step";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: "EmojiStory/component/Step",
  component: Step,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Step>;

export default meta;
type Story = StoryObj<typeof meta>;

const primaryStep = {
  selectedEmoji: "",
  emojiContender: [
    {
      value: "🚶🏼",
      votes: 0,
    },
    {
      value: "🏊🏻",
      votes: 0,
    },
    {
      value: "💅🏿",
      votes: 0,
    },
    {
      value: "🍍",
      votes: 0,
    },
    {
      value: "👯",
      votes: 0,
    },
    {
      value: "📡",
      votes: 0,
    },
    {
      value: "👧🏽",
      votes: 0,
    },
    {
      value: "🙋🏾",
      votes: 0,
    },
  ],
};

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    step: primaryStep,
  },
};
export const Secondary: Story = {
  args: {
    step: {
      selectedEmoji: "",
      emojiContender: [
        {
          value: "�",
          votes: 0,
        },
        {
          value: "🐀",
          votes: 0,
        },
        {
          value: "�",
          votes: 0,
        },
        {
          value: "📌",
          votes: 0,
        },
        {
          value: "🎎",
          votes: 0,
        },
        {
          value: "�",
          votes: 0,
        },
        {
          value: "��",
          votes: 0,
        },
        {
          value: "�",
          votes: 0,
        },
      ],
    },
  },
};
