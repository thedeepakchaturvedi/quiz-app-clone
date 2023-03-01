import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const AdminDetailsModal = (props) => {
    const {
        adminName,
        setAdminName,
        adminEmail,
        setAdminEmail,
        quizDescription,
        setQuizDescription,
    } = props;

    const adminNameChangeHandler = (val) => {
        setAdminName(val);
    };

    const adminEmailChangeHandler = (val) => {
        setAdminEmail(val);
    };

    const quizDescriptionChangeHandler = (val) => {
        setQuizDescription(val);
    };

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(handleShow, []);

    return (
        <>
            {/* <Button variant="primary" onClick={handleShow}>
                Launch demo modal
            </Button> */}

            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Admin Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput2"
                        >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Name"
                                autoFocus
                                onChange={(e) => setAdminName(e.target.value)}
                                value={adminName}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlInput1"
                        >
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="name@example.com"
                                onChange={(e) => setAdminEmail(e.target.value)}
                                value={adminEmail}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>
                                Quiz Description or Instructions
                            </Form.Label>
                            <Form.Control
                                onChange={(e) =>
                                    setQuizDescription(e.target.value)
                                }
                                value={quizDescription}
                                as="textarea"
                                rows={3}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

// render(<AdminDetailsModal />);
export default AdminDetailsModal;
