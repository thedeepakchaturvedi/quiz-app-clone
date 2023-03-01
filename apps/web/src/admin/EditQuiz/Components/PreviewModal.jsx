import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import TakeQuizPreview from '../../PreviewQuiz';

const PreviewModal = (props) => {
    const { lgShow, setLgShow, quizName, questions, quizDescription } = props;
    useEffect(() => {
        setLgShow(true);
        console.log(quizName, questions, quizDescription);
    }, []);
    return (
        <>
            <Modal
                size="lg"
                show={lgShow}
                onHide={() => setLgShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-lg">
                        Quiz Preview
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TakeQuizPreview
                        quizName={quizName}
                        questions={questions}
                        quizDescription={quizDescription}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
};

export default PreviewModal;
