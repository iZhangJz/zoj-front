/* eslint-disable */
import type { QuestionJudgeCase } from "./QuestionJudgeCase";
import type { QuestionJudgeConfig } from "./QuestionJudgeConfig";

export type QuestionVO = {
  acceptedNum?: number;
  answer?: string;
  content?: string;
  createTime?: string;
  favourNum?: number;
  id?: number;
  judgeCase?: Array<QuestionJudgeCase>;
  judgeConfig?: QuestionJudgeConfig;
  submitNum?: number;
  tags?: Array<string>;
  thumbNum?: number;
  title?: string;
  updateTime?: string;
  userId?: number;
};
