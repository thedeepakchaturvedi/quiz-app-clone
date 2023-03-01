import mongoose from 'mongoose';
import { MONGO_URL } from '../src/env';
import { QuizReport, QuizSubmission } from '../src/models';
import db from './db.json';
import hcf from './hcf.json';
import js from './js.json';

const addQuiz = async () => {
    await fetch('http://localhost:8000/quiz', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(hcf),
    });
    await fetch('http://localhost:8000/quiz', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(js),
    });
    await fetch('http://localhost:8000/quiz', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(db),
    });
};

const addSubAndReport = async () => {
    let data: any = await fetch('http://localhost:8000/quiz');
    data = await data.json();

    for (const e of data.data) {
        const s1 = new QuizSubmission({
            quizID: e.id,
            quizTitle: e.title,
            userID: e.adminID,
            username: 'varun',
            score: e.totalPoints / 2,
            totalScore: e.totalPoints,
            correctQuestions: e.questions.length / 2,
            totalQuestions: e.questions.length,
        });

        await s1.save();

        const s2 = new QuizSubmission({
            quizID: e.id,
            quizTitle: e.title,
            userID: e.adminID,
            username: 'varun',
            score: e.totalPoints - 2,
            totalScore: e.totalPoints,
            correctQuestions: e.questions.length - 2,
            totalQuestions: e.questions.length,
        });
        await s2.save();

        const s3 = new QuizSubmission({
            quizID: e.id,
            quizTitle: e.title,
            userID: e.adminID,
            username: 'varun',
            score: e.totalPoints,
            totalScore: e.totalPoints,
            correctQuestions: e.questions.length,
            totalQuestions: e.questions.length,
        });

        await s3.save();

        const rep = new QuizReport({
            quizID: e.id,
            quizTaken: 3,
            avgScore: (e.totalPoints * 2) / 3,
            sumScore: e.totalPoints * 3,
            totalScore: e.totalPoints,
        });
        await rep.save();
    }
};

(async function () {
    await mongoose.set('strictQuery', false).connect(MONGO_URL);
    console.log('Connected to DB successfully!');

    await addQuiz();
    console.log('\nAdded Quiz Data');

    await addSubAndReport();
    console.log('\nAdded All Submissions and Report');

    process.exit(0);
})();
