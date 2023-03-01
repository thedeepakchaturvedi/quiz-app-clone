import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const SuccessModal = (props) => {
    const { successStatus, setSuccessStatus } = props;
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => {
        //reset status
        setSuccessStatus('');
        setShow(false);
        navigate(`/quiz`);
    };
    const handleShow = () => setShow(true);

    useEffect(handleShow, []);

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Quiz Successfully Created!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Congrats, the Quiz is created successfully, go to admin
                    dashboard to access the Quiz
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose}>
                        Understood
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default SuccessModal;
