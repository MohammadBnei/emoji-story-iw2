import { useEffect, useState } from "react";
import { StoryStep } from "../../../../interface/emoji";
import Step from "./Step";
import { Meta, StoryObj } from "@storybook/react";

const primaryStep: StoryStep = {
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

const Wrapper = () => {
  const [step, setStep] = useState<StoryStep>(primaryStep);
  const [timeLeft, setTimeLeft] = useState<number>(20);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleVote = (emoji: string) => {
    setStep((s) => {
      if (!s.emojiContender) return s;
      const index = s.emojiContender?.findIndex((e) => e.value === emoji);

      if (index === -1 || index === undefined) {
        return s;
      }

      const current = s.emojiContender[index];

      s.emojiContender?.splice(index, 1, {
        ...current,
        votes: current.votes + 1,
      });

      return s;
    });
  };

  return (
    <>
      <button className="btn" onClick={() => setTimeLeft(20)}>
        Init timer
      </button>
      <Step
        step={step}
        stepNumber={0}
        timeLeft={timeLeft}
        handleEmojiClick={handleVote}
      />
    </>
  );
};

const meta = {
  title: "EmojiStory/component/StepWrapper",
  component: Step,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
  tags: ["autodocs"],
} satisfies Meta<typeof Wrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default = () => <Wrapper />;
