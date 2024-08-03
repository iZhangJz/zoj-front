/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { QuestionJudgeCase } from './QuestionJudgeCase';
import type { QuestionJudgeConfig } from './QuestionJudgeConfig';
import type { UserVO } from './UserVO';
export type QuestionVO = {
    acceptedNum?: number;
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
    user?: UserVO;
    userId?: number;
};

