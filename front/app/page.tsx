"use client";
import Step from "@/component/UI/step/Step";
import { useEffect, useState } from "react";
import { Story, StoryStep } from "interface/emoji";
import { toast } from "react-toastify";
import { socket } from "@/service/socket";
import { signal } from "@preact/signals-react";

const username = signal("anonymous");
const currentStep = signal<StoryStep | null>(null);
const fullStory = signal<Story | null>(null);

export default function Home() {
  const [timeLeftPerStep, setTimeLeftPerStep] = useState<
    Record<number, number>
  >({});

  const client = socket.value;

  useEffect(() => {
    client.on("story-update", (data) => {
      fullStory.value = data;
    });

    client.on("step-time", ({ stepOrder, timeLeft }) => {
      setTimeLeftPerStep({ [stepOrder]: timeLeft });
      if (window.location.href.includes("#step-" + stepOrder)) {
        toast("🦄 Wow so easy!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    });

    return () => {
      client.disconnect();
    };
  }, [client]);

  const handleVote = (emoji: string, stepOrder: number) => {
    client.emit("step-vote", { stepOrder, emoji });
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-8">
      {fullStory.value?.storyGPT && (
        <div className="w-full glass p-10">
          <p>{fullStory.value.storyGPT}</p>
        </div>
      )}
      <div className="my-4">
        <button
          className="btn btn-primary btn-wide"
          onClick={() =>
            client.emit("story-step-handle", {
              stepNumber: (fullStory.value?.steps.length || 0) + 1,
            })
          }
        >
          Next Step
        </button>
      </div>
      <div className="carousel w-full rounded-box">
        {fullStory.value?.steps.map((step) => (
          <div
            id={`step-${step.order}`}
            className="carousel-item relative w-full"
            key={step.order}
          >
            <Step
              step={step}
              timeLeft={timeLeftPerStep[step.order] || 0}
              handleEmojiClick={handleVote}
            />
            <div className="absolute flex justify-between transform  left-5 right-5">
              <a
                href={`#step-${
                  step.order === 1
                    ? fullStory.value?.steps.length
                    : step.order - 1
                }`}
                className="btn btn-circle btn-info"
              >
                ❮
              </a>
              <a
                href={`#step-${
                  fullStory.value?.steps.length <= step.order
                    ? 1
                    : step.order + 1
                }`}
                className="btn btn-circle btn-info"
              >
                ❯
              </a>
            </div>
          </div>
        ))}
      </div>
      {" "}
    </main>
  );
}
