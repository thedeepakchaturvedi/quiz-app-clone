import mongoose from 'mongoose';
import { z } from 'zod';
import {
    OptionTypeSchema,
    QuestionTypeSchema,
    QuizTypeSchema,
    UserOptionTypeSchema,
    UserQuestionTypeSchema,
    UserQuizTypeSchema,
    UserTypeSchema,
} from './schema';

export const CreateQuizInputSchema = QuizTypeSchema.omit({
    adminID: true,
}).merge(UserTypeSchema);

export const SubmitQuizInputSchema = z
    .object({
        quiz: UserQuizTypeSchema({
            optionType: UserOptionTypeSchema,
            questionType: UserQuestionTypeSchema,
        }),
    })
    .merge(UserTypeSchema);

export const EditQuizInputSchema = QuizTypeSchema;

export interface UserType
    extends mongoose.Document,
        z.infer<typeof UserTypeSchema> {}

export interface OptionType
    extends mongoose.Document,
        z.infer<typeof OptionTypeSchema> {}

export interface QuestionType
    extends mongoose.Document,
        z.infer<typeof QuestionTypeSchema> {}

export interface QuizType
    extends mongoose.Document,
        z.infer<typeof QuizTypeSchema> {}
