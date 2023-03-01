import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router';
import CopiedToast from './CopiedToast';

const QuizCardComponent = ({ quiz }) => {
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);

    // your function to copy here
    const navigateToEditQuiz = () => {
        navigate(`/edit/${quiz.id}`);
    };

    const navigateToPreviewQuiz = () => {
        navigate(`/preview/${quiz.id}`);
    };

    const navigateToQuizReport = () => {
        navigate(`/quiz/report/${quiz.id}`);
    };

    const copyToClipBoard = async (id) => {
        try {
            await navigator.clipboard.writeText(
                `${window.location.host}/quiz/${id}`
            );
            setShowToast(true);
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="quizflexcontainer">
            <div className="quiz-list">
                <div className="quiz-title">{quiz.title}</div>
                <div className="copylink">
                    {showToast && (
                        <CopiedToast
                            showToast={showToast}
                            setShowToast={setShowToast}
                        />
                    )}

                    <Button
                        variant="outline-light"
                        className="copyquizbutton"
                        onClick={() => copyToClipBoard(quiz.id)}
                    >
                        Copy Link
                    </Button>
                </div>
                <div className="edit-quiz-btn-container">
                    <Button
                        variant="outline-light"
                        className="edit-quiz-btn"
                        onClick={navigateToEditQuiz}
                    >
                        Edit Quiz
                    </Button>
                </div>
                <div className="preview-quiz-btn-container">
                    <Button
                        variant="outline-light"
                        className="preview-quiz-btn"
                        onClick={navigateToPreviewQuiz}
                    >
                        Preview Quiz
                    </Button>
                </div>
                <div className="report-quiz-btn-container">
                    <Button
                        variant="outline-light"
                        className="report-quiz-btn"
                        onClick={navigateToQuizReport}
                    >
                        Quiz Report
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default QuizCardComponent;
