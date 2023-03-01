import axios from 'axios';
import { useEffect, useState } from 'react';
import { VITE_APP_API_URL } from '../../../env';
import QuizCardComponent from './QuizCard';

const ListQuizContainer = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                setLoading(true);
                const quiz = await axios.get(
                    `${VITE_APP_API_URL}/quiz?report=true`
                );
                setQuizzes(quiz.data.data);
            } catch (error) {
                console.log(error.message);
            } finally {
                setLoading(false);
            }
        }

        getData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div className="listing-quiz">
            <div className="listing-heading">
                <h1>Quizzes</h1>
            </div>

            <div className="quizzes">
                {quizzes.map((quiz) => (
                    <QuizCardComponent key={quiz.id} quiz={quiz} />
                ))}
            </div>
        </div>
    );
};

export default ListQuizContainer;
