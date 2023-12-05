export interface Emoji {
  value: string;
  votes: number;
}

export interface StoryStep {
  order: number;
  selectedEmoji: string;
  emojiContender?: Emoji[];
}

export interface Story {
  steps: StoryStep[];
  openAiStory?: string;
}
