import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const SuccessModal = (props) => {
    const { status, setStatus } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setStatus('');
        useNavigate(`/quiz/report/${quiz.id}`);
    };

    const handleShow = () => setShow(true);
    useEffect(handleShow, []);
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Submitted Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your response has been recorded Successfully ! You may close
                    this window.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SuccessModal;
