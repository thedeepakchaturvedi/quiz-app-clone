import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { VITE_APP_API_URL } from '../../env';
import AddQuestionButton from './Components/AddQuestionButton';
import GenerateQuizButton from './Components/GenerateQuizButton';
import Header from './Components/Header';
import PreviewButton from './Components/PreviewButton';
import QuestionContainer from './Components/QuestionContainer';
import './styles/admin.css';

const EditQuiz = () => {
    const [quizData, setQuizData] = useState({});
    const [quizName, setQuizName] = useState('');
    const [quesDeleteState, setQuesDeleteState] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [quizDescription, setQuizDescription] = useState('');

    const { id } = useParams();

    const fetchQuestions = async () => {
        const res = await axios.get(
            `${VITE_APP_API_URL}/quiz/${id}?nofilter=true`
        );

        console.log(res.data.data);

        setQuizData(res.data.data);
        setQuestions([...res.data.data.questions]);
        setQuizName(res.data.data.title);
        setQuizDescription(res.data.data.description);
    };
    useEffect(() => {
        fetchQuestions();
    }, []);

    useEffect(() => {
        setQuestions([...questions]);
    }, [quesDeleteState]);

    return (
        <div className="quiz-container">
            <Header quizName={quizName} setQuizName={setQuizName} />
            {questions.map((ele, ind) => {
                return (
                    <QuestionContainer
                        key={`question-${ind}`}
                        ind={ind}
                        data={ele}
                        questions={questions}
                        setQuestions={setQuestions}
                        quesDeleteState={quesDeleteState}
                        setQuesDeleteState={setQuesDeleteState}
                    />
                );
            })}
            <div className="add-generate-container">
                <AddQuestionButton
                    questions={questions}
                    setQuestions={setQuestions}
                />
                {questions.length > 0 && (
                    <>
                        <GenerateQuizButton
                            quizData={quizData}
                            setQuizData={setQuizData}
                            questions={questions}
                            quizName={quizName}
                        />
                        <PreviewButton
                            quizName={quizName}
                            questions={questions}
                            quizDescription={quizDescription}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default EditQuiz;
