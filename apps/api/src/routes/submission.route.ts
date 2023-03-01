import express from 'express';
import {
    getSubmissionById,
    getSubmissionByQuizID,
    getSubmissionByUserID,
    getSubmissions,
} from '../controllers/submission.controller';

const router = express.Router();

/**
 * @openapi
 * '/submit':
 *  get:
 *     tags:
 *     - Submission
 *     summary: Get All Submissions
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetAllSubmissionsResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/').get(getSubmissions);

/**
 * @openapi
 * '/submit/{id}':
 *  get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *     - Submission
 *     summary: Get Submission By ID
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetSubmissionByIDResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/:id').get(getSubmissionById);

/**
 * @openapi
 * '/submit/quiz/{id}':
 *  get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *     - Submission
 *     summary: Get Submission By QuizID
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetSubmissionsByQuizIDResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/quiz/:id').get(getSubmissionByQuizID);

/**
 * @openapi
 * '/submit/user/{id}':
 *  get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *     - Submission
 *     summary: Get Submission By UserID
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetSubmissionsByUserIDResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/user/:id').get(getSubmissionByUserID);

export default router;
