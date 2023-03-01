import type { NextFunction, Request, Response } from 'express';
import AppError from '../helper/AppError';
import calculateScore from '../helper/calculateScore';
import { Quiz, QuizReport, QuizSubmission, User } from '../models';

export const createQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { body } = req;
        const { username, email } = body;

        // Check if there is user details
        if (!username || !email) {
            throw new AppError({
                message: 'User details missing',
                statusCode: 400,
            });
        }

        // Get user
        let user = await User.findOne({ username });
        if (!user) {
            // If user isn't present the create new user with the given credentials
            user = new User({ username, email });
            await user.save();
        }

        // Set adminID
        body.adminID = user._id;

        const quiz = new Quiz(body);
        const savedQuiz = await quiz.save();

        res.status(201).json({
            message: 'Quiz Created Successfully!',
            data: savedQuiz,
        });
    } catch (err: any) {
        next(
            new AppError({
                message: err.message || 'Server error occurred!',
                statusCode: err.statusCode || 400,
                stack: err.stack || '',
            })
        );
    }
};

export const getAllQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            query: { report },
        } = req;

        const quizzes = await Quiz.find().sort({ createdAt: -1 });
        let jsonQuiz: any[] = [];

        if (!report || report === 'false') {
            jsonQuiz = quizzes.map((quiz) => quiz.toJSON());
        } else {
            const quizReport = await QuizReport.find();
            for (const quiz of quizzes) {
                const json = quiz.toJSON();

                const report = quizReport.find(
                    (rep) => rep.quizID === quiz._id.toString()
                );
                const result: any = { ...json };

                if (!report) {
                    result.quizTaken = 0;
                    result.avgScore = 0;
                } else {
                    result.quizTaken = report.quizTaken;
                    result.avgScore = report?.avgScore;
                }

                jsonQuiz.push(result);
            }
        }

        res.status(200).json({
            message: 'Fetched quizzes Successfully!',
            data: jsonQuiz,
        });
    } catch (err: any) {
        next(
            new AppError({
                message: err.message || 'Server error occurred!',
                statusCode: err.statusCode || 400,
                stack: err.stack || '',
            })
        );
    }
};

export const getQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            params: { id },
            query: { nofilter },
        } = req;

        if (!id) {
            throw new AppError({
                message: 'Please provide the Quiz ID!',
                statusCode: 401,
            });
        }

        const quiz = await Quiz.findById(id);

        if (!quiz) {
            throw new AppError({
                message: 'Invalid ID, Cannot get the requested quiz.',
                statusCode: 401,
            });
        }

        if (nofilter === 'true') {
            return res.status(200).send({
                message: 'Fetched quiz Successfully!',
                data: quiz.toObject(),
            });
        }

        res.status(200).json({
            message: 'Fetched quiz Successfully!',
            data: quiz,
        });
    } catch (err: any) {
        next(
            new AppError({
                message: err.message || 'Server error occurred!',
                statusCode: err.statusCode || 400,
                stack: err.stack || '',
            })
        );
    }
};

export const updateQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            params: { id },
            body,
        } = req;

        if (id !== body.id) {
            throw new AppError({
                message: 'Invalid request, the IDs does not match.',
                statusCode: 401,
            });
        }
        const { questions } = body;
        if (!questions) {
            throw new AppError({
                message: 'Invalid payload.',
                statusCode: 401,
            });
        }

        body.totalPoints = questions.reduce(
            (accumulator: number, currentObject: any) =>
                accumulator + Number(currentObject.points),
            0
        );

        const quiz = await Quiz.findByIdAndUpdate(id, body);
        if (!quiz) {
            throw new AppError({
                message: "Invalid id, couldn't find quiz of given id.",
                statusCode: 401,
            });
        }

        await quiz.save();

        res.status(200).json({
            message: 'Updated quiz Successfully!',
            data: quiz.toJSON(),
        });
    } catch (err: any) {
        next(
            new AppError({
                message: err.message || 'Server error occurred!',
                statusCode: err.statusCode || 400,
                stack: err.stack || '',
            })
        );
    }
};

export const submitQuiz = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            body: { quiz: submittedQuiz, username, email },
        } = req;
        const { id } = submittedQuiz;

        if (!username || !email) {
            throw new AppError({
                message: 'Please provide user details.',
                statusCode: 401,
            });
        }

        if (!submittedQuiz || !id) {
            throw new AppError({
                message: 'Please provide the quiz details for submission.',
                statusCode: 401,
            });
        }

        let user = await User.findOne({ username });
        if (!user) {
            user = new User({ username, email });
            await user.save();
        }

        const quiz = await Quiz.findById(id);
        if (!quiz) {
            throw new AppError({
                message:
                    'Error! Cannot retrieve given quiz, or quiz not present.',
                statusCode: 404,
            });
        }
        const { score, correctQuestions } = calculateScore(quiz, submittedQuiz);

        const quizSubmission = new QuizSubmission({
            quizID: quiz._id,
            quizTitle: quiz.title,
            userID: user._id,
            username: user.username,
            score: score,
            correctQuestions,
            totalScore: quiz.totalPoints,
            totalQuestions: quiz.questions.length,
        });
        await quizSubmission.save();

        let quizReport = await QuizReport.findOne({ quizID: quiz._id });

        if (!quizReport) {
            let quizReport = await new QuizReport({
                quizID: quiz._id,
                quizTaken: 1,
                avgScore: score,
                sumScore: score,
                totalScore: quiz.totalPoints,
            });

            await quizReport.save();
        } else {
            // Calculate new average score
            const avg =
                (quizReport.sumScore + score) / (quizReport.quizTaken + 1);

            await QuizReport.findOneAndUpdate(
                { _id: quizReport._id },
                {
                    quizTaken: quizReport.quizTaken + 1,
                    avgScore: avg,
                    sumScore: quizReport.sumScore + score,
                    totalScore: quiz.totalPoints,
                }
            );
        }

        res.status(201).json({
            message: 'Quiz Submitted Successfully!!',
            data: {
                id: quizSubmission._id,
            },
        });
    } catch (err: any) {
        next(
            new AppError({
                message: err.message || 'Server error occurred!',
                statusCode: err.statusCode || 400,
                stack: err.stack || '',
            })
        );
    }
};
