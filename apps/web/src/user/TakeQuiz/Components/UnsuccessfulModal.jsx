import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
const UnSuccessfulModal = (props) => {
    const { status, setStatus, message } = props;
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false);
        setStatus('');
    };

    const handleShow = () => setShow(true);
    useEffect(handleShow, []);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Submission Failed </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Quiz submission unsuccessful ! <br />
                    <br />
                    <br />
                    {message}
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default UnSuccessfulModal;
