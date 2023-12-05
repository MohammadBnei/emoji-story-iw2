import { useEffect, useState } from "react";
import { Emoji, StoryStep } from "@/interface/emoji";
import Step from "./Step";
import { Meta, StoryObj } from "@storybook/react";

const primaryStep: StoryStep = {
  order: 1,
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
  const [currentVote, setCurrentVote] = useState<string>("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((t) => (t === 0 ? t : t - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    setStep((s) => ({
      ...s,
      selectedEmoji:
        s.emojiContender?.reduce(
          (acc, cur) => {
            if (!acc.value || cur.votes > acc.votes) return cur;

            return acc;
          },
          { value: "", votes: 0 } as Emoji
        )?.value || "",
    }));
  }, [timeLeft]);

  const handleVote = (emoji: string) => {
    if (timeLeft === 0) return;

    setStep((s) => ({
      ...s,
      emojiContender: s.emojiContender
        ?.map((emojiContenderItem) =>
          emojiContenderItem.value === emoji &&
          emojiContenderItem.value !== currentVote
            ? {
                ...emojiContenderItem,
                votes: emojiContenderItem?.votes + 1,
              }
            : emojiContenderItem
        )
        .map((emojiContenderItem) =>
          emojiContenderItem.value === currentVote
            ? {
                ...emojiContenderItem,
                votes: emojiContenderItem?.votes - 1,
              }
            : emojiContenderItem
        ),
    }));

    setCurrentVote((cur) => (cur === emoji ? "" : emoji));
  };

  return (
    <>
      <button
        className="btn"
        onClick={() => {
          setTimeLeft(10);
          setCurrentVote("");
          setStep(primaryStep);
        }}
      >
        Init timer
      </button>
      <Step
        emojiContenders={step.emojiContender || []}
        selectedEmoji={step.selectedEmoji}
        stepNumber={1}
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
