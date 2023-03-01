import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Loading } from 'ui';
import { VITE_APP_API_URL } from '../../env';
import Header from './Components/Header';
import QuizContainer from './Components/QuizContainer';
import './style/style.css';
function TakeQuiz() {
    const { id } = useParams();
    const [quiz, setQuiz] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        async function getQuiz() {
            try {
                setLoading(true);
                const json = await axios.get(`${VITE_APP_API_URL}/quiz/${id}`);
                setQuiz(json.data.data);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }

        getQuiz();
    }, [id]);

    if (loading || !quiz.title) return <Loading message="Loading.." />;

    return (
        <div>
            <Header title={quiz.title} totalPoints={quiz.totalPoints} />
            <QuizContainer quiz={quiz} />
        </div>
    );
}

export default TakeQuiz;
