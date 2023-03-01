import express from 'express';
import {
    createQuiz,
    getAllQuiz,
    getQuiz,
    submitQuiz,
    updateQuiz,
} from '../controllers/quiz.controller';
import {
    getReportByQuizId,
    getReports,
} from '../controllers/report.controller';
import validate from '../middleware/validate';
import {
    CreateQuizInputSchema,
    EditQuizInputSchema,
    SubmitQuizInputSchema,
} from '../types';

const router = express.Router();
/**
 * @openapi
 * '/quiz':
 *  get:
 *     tags:
 *     - Quiz
 *     summary: Get all quizzes
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetAllQuizResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/').get(getAllQuiz);

/**
 * @openapi
 * '/quiz':
 *  post:
 *     tags:
 *     - Quiz
 *     summary: Create Quiz
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateQuizRequest'
 *     responses:
 *      201:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateQuizResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/').post(validate(CreateQuizInputSchema), createQuiz);

/**
 * @openapi
 * '/quiz/report':
 *  get:
 *     tags:
 *     - Report
 *     summary: Get All Reports
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetAllReportsResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/report').get(getReports);

/**
 * @openapi
 * '/quiz/report/{id}':
 *  get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *     - Report
 *     summary: Get Report By QuizID
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetReportByQuizIDResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/report/:id').get(getReportByQuizId);

/**
 * @openapi
 * '/quiz/{id}':
 *  get:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *     - Quiz
 *     summary: Get Quiz By ID
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/GetQuizByIDResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
// * NOTE: This should be at last as it catches other routes also.
router.route('/:id').get(getQuiz);

/**
 * @openapi
 * '/quiz/{id}':
 *  put:
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     tags:
 *     - Quiz
 *     summary: Update Quiz
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateQuizRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdateQuizResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/:id').put(validate(EditQuizInputSchema), updateQuiz);

/**
 * @openapi
 * '/quiz/submit':
 *  post:
 *     tags:
 *     - Quiz
 *     summary: Submit Quiz
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/SubmitQuizRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/SubmitQuizResponse'
 *      404:
 *        description: Not Found
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 *      400:
 *        description: Bad request
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/BadRequestResponse'
 */
router.route('/submit').post(validate(SubmitQuizInputSchema), submitQuiz);

export default router;
