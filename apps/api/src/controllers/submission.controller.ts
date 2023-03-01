import { NextFunction, Request, Response } from 'express';
import AppError from '../helper/AppError';
import { QuizSubmission } from '../models';

export const getSubmissions = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const subs = await QuizSubmission.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Fetched all submissions successfully!',
            data: subs,
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

export const getSubmissionById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            params: { id },
        } = req;

        if (!id) {
            throw new AppError({
                message: 'Please provide the Submission ID!',
                statusCode: 401,
            });
        }

        const sub = await QuizSubmission.findById(id);

        if (!sub) {
            throw new AppError({
                message: 'Invalid ID, Cannot get the requested submission.',
                statusCode: 401,
            });
        }

        res.status(200).json({
            message: 'Fetched submission Successfully!',
            data: sub,
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

export const getSubmissionByQuizID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            params: { id },
        } = req;

        if (!id) {
            throw new AppError({
                message: 'Please provide the Quiz ID!',
                statusCode: 401,
            });
        }

        const subs = await QuizSubmission.find({ quizID: id });

        if (!subs.length) {
            throw new AppError({
                message: 'No submission found for the particular quiz.',
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: 'Fetched all submissions successfully!',
            data: subs,
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

export const getSubmissionByUserID = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {
            params: { id },
        } = req;

        if (!id) {
            throw new AppError({
                message: 'Please provide the User ID!',
                statusCode: 401,
            });
        }

        const subs = await QuizSubmission.find({ userID: id });

        if (!subs.length) {
            throw new AppError({
                message: 'No submission found for the particular user.',
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: 'Fetched all submissions successfully!',
            data: subs,
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
