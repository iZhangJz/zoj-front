/* eslint-disable */
import type { QuestionJudgeCase } from "./QuestionJudgeCase";
import type { QuestionJudgeConfig } from "./QuestionJudgeConfig";

export type QuestionAddRequest = {
  answer?: string;
  content?: string;
  judgeCase?: Array<QuestionJudgeCase>;
  judgeConfig?: QuestionJudgeConfig;
  tags?: Array<string>;
  title?: string;
};
