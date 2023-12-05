"use client";

import { I } from "@/interface";
import { useState } from "react";

interface Props {
  emojiContenders: I.Emoji[];
  selectedEmoji: string;
  stepNumber: number;
  timeLeft: number;
  handleEmojiClick: (emoji: string) => void;
}

// tu peux utiliser ça pour la step : <div className="artboard phone-1">320×568</div> :)
// Afficher la step en cours
// Afficher les emojis et leur nombre de vote
// Afficher l'emoji selectionnée
// Préparer le timer

const Step = ({
  emojiContenders,
  stepNumber,
  timeLeft,
  handleEmojiClick,
  selectedEmoji,
}: Props) => {
  const [currentVote, setCurrentVote] = useState<string>("");
  return (
    <div>
      <h1 className="text-5xl font-bold">Step Number : {stepNumber}</h1>
      <span
        className={`countdown flex justify-center ${
          timeLeft === 0 ? "text-red" : "text-primary"
        } text-xl my-3`}
      >
        {/*  @ts-ignore */}
        <span style={{ "--value": timeLeft }}></span>
      </span>
      <div className="artboard phone-1">
        <div className="grid grid-cols-2 content-center">
          <div className="flex flex-col">
            {emojiContenders?.map((emoji) => (
              <div key={emoji.value} className="flex items-center">
                <button
                  className={`text-4xl w-50 mr-4 btn ${
                    currentVote === emoji.value
                      ? "btn-primary"
                      : "btn-ghost glass"
                  }`}
                  onClick={() => {
                    currentVote === emoji.value
                      ? setCurrentVote("")
                      : setCurrentVote(emoji.value);
                    handleEmojiClick(emoji.value);
                  }}
                >
                  {emoji.value}
                </button>
                <div className="w-50 text-current text-lg">
                  {emoji.votes || 0}
                </div>
              </div>
            ))}
          </div>
          <div>
            {selectedEmoji && (
              <div className="border-2 rounded-lg p-1 border-pink-600 text-3xl text-center py-4">
                {selectedEmoji}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step;
