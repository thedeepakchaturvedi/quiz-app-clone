import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { VITE_APP_API_URL } from '../../../env';
import SuccessModal from './SuccessModal';
import UnSuccessfulModal from './UnSuccessfulModal';

const GenerateQuizButton = (props) => {
    const { quizName, questions, quizData, setQuizData } = props;
    const [successStatus, setSuccessStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    const clickHandler = () => {
        const data = {
            ...quizData,
        };
        data.title = quizName;
        data.questions = [...questions];

        setQuizData(data);
        console.log(data);

        axios
            .put(`${VITE_APP_API_URL}/quiz/${quizData.id}`, data)
            .then((data) => {
                console.log('Successful');
                console.log(data.data);
                setSuccessStatus(true);
            })
            .catch((err) => {
                console.log(err);
                console.log('Unsuccessful', err);
                setErrorMessage(err.response.data.message);
                setSuccessStatus(false);
            });
    };

    return (
        <div className="generate-quiz-btn-container">
            <div className="option-btn-container">
                <Button className="" variant="success" onClick={clickHandler}>
                    GENERATE QUIZ
                </Button>
                {successStatus === true ? (
                    <SuccessModal
                        successStatus={successStatus}
                        setSuccessStatus={setSuccessStatus}
                    />
                ) : (
                    ''
                )}
                {successStatus === false ? (
                    <UnSuccessfulModal
                        message={errorMessage}
                        successStatus={successStatus}
                        setSuccessStatus={setSuccessStatus}
                    />
                ) : (
                    ''
                )}
            </div>
        </div>
    );
};

export default GenerateQuizButton;
