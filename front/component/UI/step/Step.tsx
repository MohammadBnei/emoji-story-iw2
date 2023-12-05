"use client";
import { StoryStep } from "../../../../interface/emoji";

interface Props {
  step: StoryStep;
  timeLeft: number;
  handleEmojiClick: (emoji: string, stepOrder: number) => void;
}

// tu peux utiliser ça pour la step : <div className="artboard phone-1">320×568</div> :)
// Afficher la step en cours
// Afficher les emojis et leur nombre de vote
// Afficher l'emoji selectionnée
// Préparer le timer

const Step = ({ step, timeLeft, handleEmojiClick }: Props) => {
  return (
    <div className="w-full m-4">
      <h1 className="text-5xl font-bold text-center my-12">
        {step.selectedEmoji} Step Number : {step.order} {"   "}
      </h1>
      {!step.selectedEmoji && (
        <div className="flex justify-center my-6">
          <span
            className={`countdown text-6xl ${
              timeLeft !== 0 ? "text-green-400" : "text-red-400"
            }`}
          >
            <span style={{ "--value": timeLeft }}></span>
          </span>
        </div>
      )}
      <div className="flex flex-col lg:flex-row lg:gap-10 justify-around m-auto flex-wrap">
        {step?.emojiContender?.map((emoji) => (
          <div key={emoji.value} className="flex">
            <button
              className="text-4xl w-50 mr-4 btn scale-125"
              onClick={() => handleEmojiClick(emoji.value, step.order)}
            >
              {emoji.value}
            </button>
            <div className="w-50">{emoji.votes} votes</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Step;
