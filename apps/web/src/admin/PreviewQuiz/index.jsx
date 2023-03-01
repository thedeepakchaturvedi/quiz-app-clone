import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { VITE_APP_API_URL } from '../../env';
import Header from './Components/Header';
import QuizContainer from './Components/QuizContainer';
import './style/style.css';

const TakeQuizPreview = (props) => {
    const { id } = useParams();
    const [quiz, setQuiz] = useState({});
    const [state, setState] = useState(null);

    const { quizName, questions, quizDescription } = props;

    const fetchData = async () => {
        const res = await axios.get(`${VITE_APP_API_URL}/quiz/${id}`);
        console.log(res.data.data);
        const data = {
            quizName: res.data.data.title,
            questions: [...res.data.data.questions],
            quizDescription: res.data.data.description,
        };
        console.log(data);
        setQuiz(data);
        setState(true);
    };
    useEffect(() => {
        if (Object.keys(props).length !== 0) {
            console.log(props);
            const data = {
                quizName: quizName,
                questions: [...questions],
                quizDescription: quizDescription,
            };
            console.log(data);
            setQuiz(data);
            setState(true);
        } else {
            fetchData();
        }
    }, []);

    return (
        <div>
            {state ? (
                <>
                    <Header title={quiz.quizName} />
                    <QuizContainer quiz={quiz} />
                </>
            ) : (
                ''
            )}
        </div>
    );
};

export default TakeQuizPreview;
