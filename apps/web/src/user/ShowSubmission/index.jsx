import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useParams } from 'react-router';
import { Loading } from 'ui';
import { VITE_APP_API_URL } from '../../env';
import './style/style.css';

import { FaRegCheckCircle } from 'react-icons/fa';

const ShowSubmission = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const submit = await axios.get(
                    `${VITE_APP_API_URL}/submit/${id}`
                );
                setSubmission(submit.data.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, [id]);

    if (loading) return <Loading message={'Loading...'} />;
    console.log('submission :', submission);
    let num = (submission.score / submission.totalScore) * 100;
    num = Math.round(num * 100) / 100;
    return (
        <div className="submissionContainer">
            <h1 className="quizTitle">{submission.quizTitle}</h1>
            <br />
            <br />
            <br />
            <div className="submissionContent">
                <FaRegCheckCircle className="tick" />
                <br />
                <br />
                <h1>Your response has been recorded</h1>
                <br />
                <p>Your Score</p>
                <p>
                    {submission.score}/{submission.totalScore}
                </p>
                <br />
                <div className="progressBar">
                    <ProgressBar className="bar" now={num} label={`${num}%`} />
                </div>
                <br />
                <p>
                    No of correct Questions: {submission.correctQuestions} /{' '}
                    {submission.totalQuestions}
                </p>
            </div>
        </div>
    );
};
export default ShowSubmission;
