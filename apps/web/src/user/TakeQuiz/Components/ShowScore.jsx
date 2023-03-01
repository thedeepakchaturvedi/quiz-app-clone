import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const ShowScore = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        navigate('/');
    };

    const handleShow = () => setShow(true);
    useEffect(handleShow, []);
    let score = 0;
    let total_score = 0;

    return (
        <>
            <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header>
                    <Modal.Title>Quiz Result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Your score is : {score} / {total_score}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ShowScore;
