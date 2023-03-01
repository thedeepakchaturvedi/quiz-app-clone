import { useState } from 'react';
import { Button } from 'react-bootstrap';
import PreviewModal from './PreviewModal';
const PreviewButton = (props) => {
    const [lgShow, setLgShow] = useState(false);
    const { quizName, questions, quizDescription } = props;
    return (
        <>
            {lgShow && (
                <PreviewModal
                    lgShow={lgShow}
                    setLgShow={setLgShow}
                    quizName={quizName}
                    questions={questions}
                    quizDescription={quizDescription}
                />
            )}
            <Button
                className="preview-btn-container"
                variant="dark"
                onClick={() => setLgShow(true)}
            >
                QUIZ PREVIEW
            </Button>
        </>
    );
};

export default PreviewButton;
