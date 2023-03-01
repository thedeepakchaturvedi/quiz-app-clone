import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loading } from 'ui';
import { VITE_APP_API_URL } from '../../env';
import UserList from './Components/UserDetails';
import './styles/styleQuizReport.css';

const QuizReport = () => {
    const { id } = useParams();

    const [report, setReport] = useState();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        setLoading(true);
        Promise.all([
            axios.get(`${VITE_APP_API_URL}/quiz/report/${id}`),
            axios.get(`${VITE_APP_API_URL}/submit/quiz/${id}`),
        ])
            .then((res) => {
                const [rep, sub] = res;
                console.log({ rep, sub });
                setReport(rep.data.data);
                setSubmissions(sub.data.data);
            })
            .catch((err) => {
                console.log(err);
                setError(err.response.data.message);
            })
            .finally(() => setLoading(false));
    }, [id]);

    const fetchName = async () => {
        const res = await axios.get(`${VITE_APP_API_URL}/quiz/${id}`);
        setTitle(res.data.data.title);
    };
    useEffect(() => {
        fetchName();
    }, []);

    if (error) {
        return (
            <div>
                <div className="report-listing-quiz">
                    <div className="report-listing-heading">
                        <h1>{title}</h1>
                    </div>
                    <div className="report-quiz-detailes">
                        <p>No. Of times Quiz Taken: 0</p>
                    </div>

                    <div
                        className="report-quizzes"
                        style={{
                            textAlign: 'center',
                            color: 'red',
                            fontWeight: 'bold',
                        }}
                    >
                        No User Responses Present !
                    </div>
                </div>
            </div>
        );
    }
    if (loading || !report) return <Loading message="Fetching data..." />;

    return (
        <div>
            <div className="report-listing-quiz">
                <div className="report-listing-heading">
                    <h1>{submissions[0].quizTitle}</h1>
                </div>
                <div className="report-quiz-detailes">
                    <p>No. Of times Quiz Taken: {report.quizTaken}</p>
                    <p>
                        Average Score:{' '}
                        {(Math.round(report.avgScore * 100) / 100).toFixed(2) +
                            ' / ' +
                            report.totalScore}
                    </p>
                </div>

                <div className="report-quizzes">
                    {submissions.length > 0 &&
                        submissions.map((submit) => (
                            <UserList key={submit.id} submission={submit} />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default QuizReport;
