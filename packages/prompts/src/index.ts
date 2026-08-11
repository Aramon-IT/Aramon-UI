import {
  aramonApplicationPrompt,
  aramonComponentPrompt,
  aramonSystemPrompt,
} from "./ui-system";
import {
  aramonMediumAnimationPrompt,
  aramonMediumReviewPrompt,
} from "./medium-animation";
import { aramonReviewPrompt } from "./review";

export {
  aramonApplicationPrompt,
  aramonComponentPrompt,
  aramonMediumAnimationPrompt,
  aramonMediumReviewPrompt,
  aramonReviewPrompt,
  aramonSystemPrompt,
};

export type AramonPromptKind = "application" | "component" | "medium" | "review";

const promptByKind = {
  application: aramonApplicationPrompt,
  component: aramonComponentPrompt,
  medium: aramonMediumAnimationPrompt,
  review: aramonReviewPrompt,
} as const satisfies Record<AramonPromptKind, string>;

export function createAramonPrompt(kind: AramonPromptKind, task: string) {
  return [aramonSystemPrompt, promptByKind[kind], `CURRENT TASK\n${task.trim()}`].join("\n\n---\n\n");
}
