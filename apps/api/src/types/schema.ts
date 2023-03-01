import { AnyZodObject, z } from 'zod';

export const UserTypeSchema = z.object({
    username: z
        .string({
            required_error: 'Username is required.',
        })
        .min(3, 'Minimum 3 characters required in username.'),
    email: z
        .string({
            required_error: 'Email is required.',
        })
        .email('Invalid Email.'),
});

export const OptionTypeSchema = z.object({
    _id: z.any(),
    title: z.string({
        required_error: 'Option title is required.',
    }),
    isAnswer: z.boolean({
        required_error: 'Option -> isAnswer is required.',
        invalid_type_error: 'Option -> isAnswer must be a boolean.',
    }),
});

export const QuestionTypeSchema = z.object({
    _id: z.any(),
    title: z
        .string({
            required_error: 'Question title is required.',
        })
        .min(3, 'Minimum 3 characters required for question title.'),
    isMultiple: z.boolean({
        required_error: 'Question -> isMultiple is required.',
        invalid_type_error: 'Question -> isMultiple must be a boolean.',
    }),
    // points: z
    //     .number({
    //         required_error: 'Points are required for a Question.',
    //         invalid_type_error: 'Points must be a number.',
    //     })
    //     .nonnegative('Points must be a positive number'),
    points: z.any(),
    options: z
        .array(OptionTypeSchema)
        .min(2, 'Minimum 2 option required for a question.'),
});

export const QuizTypeSchema = z.object({
    title: z
        .string({
            required_error: 'Quiz title is required.',
        })
        .min(3, 'Minimum 3 characters required for quiz title.'),
    description: z
        .string({
            required_error: 'Quiz description is required.',
        })
        .min(3, 'Minimum 3 characters required for quiz description.'),
    adminID: z.string({
        required_error: 'AdminID is required for Question.',
    }),
    questions: z
        .array(QuestionTypeSchema)
        .min(1, 'Minimum 1 question required for a quiz.'),
    totalPoints: z.optional(
        z.number().nonnegative('Total Points must be a positive number.')
    ),
    urlId: z.string({
        required_error: 'UrlID is required for a quiz.',
    }),
});

export const QuizReportTypeSchema = z.object({
    quizID: z.string({
        required_error: 'QuizID is required for QuizReport.',
    }),
    quizTaken: z
        .number({
            required_error: 'QuizTaken is required for QuizReport.',
            invalid_type_error: 'QuizTaken must be a number.',
        })
        .nonnegative('QuizTaken must be a positive number.'),
    avgScore: z
        .number({
            required_error: 'AvgScore is required for QuizReport.',
            invalid_type_error: 'AvgScore must be a number.',
        })
        .nonnegative('AvgScore must be a positive number.'),
    sumScore: z
        .number({
            required_error: 'SumScore is required for QuizReport.',
            invalid_type_error: 'SumScore must be a number.',
        })
        .nonnegative('SumScore must be a positive number.'),
    totalScore: z
        .number({
            required_error: 'TotalScore is required for QuizReport.',
            invalid_type_error: 'TotalScore must be a number.',
        })
        .nonnegative('TotalScore must be a positive number.'),
});

export const QuizSubmissionTypeSchema = z.object({
    quizID: z.string({
        required_error: 'QuizID is required for QuizReport.',
    }),
    quizTitle: z
        .string({
            required_error: 'Quiz title is required.',
        })
        .min(3, 'Minimum 3 characters required for quiz title.'),
    userID: z.string({
        required_error: 'UserID is required for Question.',
    }),
    username: z.string({
        required_error: 'Username is required for Question.',
    }),
    score: z
        .number({
            required_error: 'Score is required for QuizReport.',
            invalid_type_error: 'Score must be a number.',
        })
        .nonnegative('Score must be a positive number.'),
    correctQuestions: z
        .number({
            required_error: 'CorrectQuestions is required for QuizReport.',
            invalid_type_error: 'CorrectQuestions must be a number.',
        })
        .nonnegative('CorrectQuestions must be a positive number.'),
    totalScore: z
        .number({
            required_error: 'TotalScore is required for QuizReport.',
            invalid_type_error: 'TotalScore must be a number.',
        })
        .nonnegative('TotalScore must be a positive number.'),
    totalQuestions: z
        .number({
            required_error: 'TotalQuestions is required for QuizReport.',
            invalid_type_error: 'TotalQuestions must be a number.',
        })
        .nonnegative('TotalQuestions must be a positive number.'),
});

export const UserOptionTypeSchema = OptionTypeSchema.omit({
    isAnswer: true,
}).merge(
    z.object({
        id: z.string({
            required_error: 'ID is required for an option.',
        }),
        isSelected: z.boolean({
            required_error: 'Option -> isSelected is required.',
            invalid_type_error: 'Option -> isSelected must be a boolean.',
        }),
    })
);

export const UserQuestionTypeSchema = (optionType: AnyZodObject) =>
    QuestionTypeSchema.omit({ options: true }).merge(
        z.object({
            id: z.string({
                required_error: 'ID is required for a question.',
            }),
            options: z.array(optionType),
        })
    );

export const OptionTypeSchemaWithID = OptionTypeSchema.merge(
    z.object({
        id: z.string({
            required_error: 'ID is required for an option.',
        }),
    })
);

export const UserQuizTypeSchema = ({
    optionType,
    questionType,
}: {
    optionType: AnyZodObject;
    questionType: (optionType: AnyZodObject) => AnyZodObject;
}) =>
    QuizTypeSchema.omit({
        questions: true,
        totalPoints: true,
    }).merge(
        z.object({
            id: z.string(),
            questions: z.array(questionType(optionType)),
            totalPoints: z
                .number({
                    required_error: 'Total Points are required for a quiz.',
                    invalid_type_error: 'Total Points must be a number.',
                })
                .nonnegative('Total Points must be a positive number'),
        })
    );
