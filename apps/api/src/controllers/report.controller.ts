import { NextFunction, Request, Response } from 'express';
import AppError from '../helper/AppError';
import { QuizReport } from '../models';

export const getReports = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const reports = await QuizReport.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Fetched quiz reports Successfully!',
            data: reports,
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

export const getReportById = async (
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
                message: 'Please provide the Report ID!',
                statusCode: 401,
            });
        }

        const report = await QuizReport.findById(id);

        if (!report) {
            throw new AppError({
                message: 'Invalid ID, Cannot get the requested report.',
                statusCode: 401,
            });
        }

        res.status(200).json({
            message: 'Fetched report Successfully!',
            data: report,
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
export const getReportByQuizId = async (
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

        const report = await QuizReport.findOne({ quizID: id });

        if (!report) {
            throw new AppError({
                message: 'No report found for the particular quiz.',
                statusCode: 404,
            });
        }

        res.status(200).json({
            message: 'Fetched report Successfully!',
            data: report,
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
