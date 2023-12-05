import { P } from '.';

export const EMOJI_VOTE = 'emoji-vote';
export const EMOJI_ERROR = 'emoji-error';
export const STEP_UPDATE = 'step-update';
export const STORY_ERROR = 'story-error';
export const STORY_UPDATE = 'story-update';
export const STORY_STEP_GENERATE = 'story-step-handle';
export const STORY_REGENERATE = 'story-regenerate';
export const STORY_INIT = 'story-init';

export interface ServerToClientEvents {
  [EMOJI_ERROR]: (message: string, payload: any) => void;
  [STORY_ERROR]: (message: string, payload: any) => void;
  [STORY_UPDATE]: (payload: P.STORY_UPDATE) => void;
  [STEP_UPDATE]: (payload: { stepNumber: number; timeLeft: number }) => void;
}

export interface InterServerEvents {
  [STEP_UPDATE]: (payload: { stepNumber: number; timeLeft: number }) => void;
}

export interface ClientToServerEvents {
  [EMOJI_VOTE]: (payload: P.EMOJI_VOTE) => void;
  [STORY_STEP_GENERATE]: (
    payload: P.STORY_STEP_GENERATE,
    setStep: (stepNumber: number) => void,
  ) => void;
  [STORY_REGENERATE]: () => void;
  [STORY_INIT]: () => void;
}
