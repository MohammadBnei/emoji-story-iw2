import { I } from ".";

export interface EMOJI_VOTE {
  emoji: string;
  stepNumber?: number;
}

export interface STORY_STEP_GENERATE {
  stepNumber: number;
}

export interface STORY_UPDATE {
  story: I.Story;
}

export interface EMOJI_ERROR {
  message: string;
}

export interface STORY_ERROR {
  message: string;
}
