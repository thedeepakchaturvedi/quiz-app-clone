import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import QuizSubmit from './QuizSubmit';
import { useNavigate } from 'react-router';
import { VITE_APP_API_URL } from '../../../env';

const ConfirmModal = (props) => {
    const {
        confirmShow,
        setConfirmShow,
        status,
        setStatus,
        score,
        setScore,
        quiz,
        username,
        email,
        setErrorMessage,
        errorMessage,
    } = props;
    const handleClose = () => setConfirmShow(false);
    const handleShow = () => setConfirmShow(true);
    const [lgShow, setLgShow] = useState(false);
    const navigate = useNavigate();
    const submitQuiz = () => {
        const payload = {
            quiz,
            username,
            email,
        };
        setLgShow(true);
        console.log('payload is', payload);
        axios
            .post(`${VITE_APP_API_URL}/quiz/submit`, payload)
            .then((data) => {
                console.log('Submission Successful');
                console.log(data.data.data.id);
                setStatus(true);
                navigate(`/submit/${data.data.data.id}`);
            })
            .catch((err) => {
                console.log('Submission Unsuccessful', err);
                setLgShow(false);
                setStatus(false);
                setErrorMessage(err.response.data.message);
            });
    };

    return (
        <>
            {lgShow && (
                <QuizSubmit
                    lgShow={lgShow}
                    setLgShow={setLgShow}
                    status={status}
                    setStatus={setStatus}
                    score={score}
                    setScore={setScore}
                />
            )}
            <Modal show={confirmShow} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm ?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure want to submit the quiz ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={submitQuiz}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};
export default ConfirmModal;
