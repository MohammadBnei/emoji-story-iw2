import { Story } from "./emoji";

export interface ClientToServerEvent {
  "step-vote": (payload: { stepOrder: number; emoji: string }) => void;

  "story-init": () => void;
  "story-step-handle": (payload: { stepNumber: number }) => void;
}

export interface ServerToClientEvent {
  "story-update": (payload: Story) => void;
  "step-time": (payload: { timeLeft: number; stepOrder: number }) => void;

  "story-error": (payload: Error) => void;
  "user-error": (payload: Error) => void;
}
