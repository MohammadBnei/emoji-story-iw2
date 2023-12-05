export interface Emoji {
  value: string;
  votes: number;
}

export interface StoryStep {
  selectedEmoji: string;
  order: number;
  emojiContender?: Emoji[];
}

export interface Story {
  steps: StoryStep[];
  storyGPT: string;
}
