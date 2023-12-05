"use client";
import Step from "@/component/UI/step/Step";
import { useEffect, useState } from "react";
import { Manager, Socket, io } from "socket.io-client";
import { P, E, I } from "@/interface";
import { toast } from "react-toastify";
import { useHotkeys } from "react-hotkeys-hook";

const manager = new Manager(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
  reconnection: true,
});

const socket: Socket<E.ServerToClientEvents, E.ClientToServerEvents> =
  manager.socket("/");

export default function Home() {
  const [step, setStep] = useState<I.StoryStep | null>(null);
  const [story, setStory] = useState<I.Story | null>(null);
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(-1);

  useEffect(() => {
    socket.on(E.STORY_UPDATE, ({ story }) => {
      console.log({ story });
      setStory(story);
      if (story.steps.length === 0) {
        setStepNumber(0);
      }
    });

    socket.on(E.STORY_ERROR, (message, data) => {
      toast(message, {
        type: "error",
      });
      console.log(message, data);
    });
    socket.on(E.EMOJI_ERROR, (message, data) => {
      toast(message, {
        type: "error",
      });
      console.log(message, data);
    });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.emit(E.STORY_STEP_GENERATE, { stepNumber }, setStepNumber);
    socket.on(E.STEP_UPDATE, ({ stepNumber: _stepNumber, timeLeft }) => {
      setTimeLeft(timeLeft);
      if (stepNumber !== _stepNumber) {
        toast(`Step ${_stepNumber} 🪲`, {
          toastId: stepNumber,
          updateId: stepNumber,
          autoClose: 500,
        });
      }
    });

    return () => {
      socket.off(E.STEP_UPDATE);
    };
  }, [stepNumber]);

  useEffect(() => {
    if (!story || stepNumber > story?.steps.length) {
      return;
    }

    setStep(story?.steps.find((s) => s.order === stepNumber) || null);
  }, [stepNumber, story]);

  const handleVote = (emoji: string) => {
    socket.emit(E.EMOJI_VOTE, { emoji });
  };

  
  const handleInit = () => {
    socket.emit(E.STORY_INIT);
    setStepNumber(0);
  };

  useHotkeys("ctrl+i", handleInit);
  useHotkeys("ctrl+r", () => socket.emit(E.STORY_REGENERATE));

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 lg:p-24">
      <div className="flex gap-4">
        <button
          className="btn btn-lg"
          onClick={() =>
            socket.emit(
              E.STORY_STEP_GENERATE,
              { stepNumber: stepNumber + 1 },
              setStepNumber
            )
          }
        >
          Next Step
        </button>
      </div>
      <div className="text-sm breadcrumbs">
        <ul>
          {story?.steps.map((step) => (
            <li key={step.order}>
              <a
                className="link text-xl "
                onClick={() => setStepNumber(step.order)}
              >
                {step.order}
                {step.selectedEmoji}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="glass p-4">
        <p className="text-xl">{story?.openAiStory}</p>
      </div>
      <Step
        emojiContenders={step?.emojiContender || []}
        selectedEmoji={step?.selectedEmoji || ""}
        stepNumber={stepNumber}
        timeLeft={timeLeft}
        handleEmojiClick={handleVote}
      />
    </main>
  );
}
