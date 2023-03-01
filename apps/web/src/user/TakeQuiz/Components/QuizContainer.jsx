import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ConfirmModal from './ConfirmModal';
import QuizQuestion from './QuizQuestion';
import UnSuccessfulModal from './UnsuccessfulModal';

const QuizContainer = ({ quiz }) => {
    const [index, setIndex] = useState(0);
    const [validated, setValidated] = useState(false);
    const [status, setStatus] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [score, setScore] = useState(0);
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmShow, setConfirmShow] = useState(false);

    const changeUsername = (e) => {
        setUserName(e.target.value);
    };
    const changeEmail = (e) => {
        setEmail(e.target.value);
    };
    const getCurrentQuestion = () => {
        const { questions } = quiz;
        return questions[index];
    };
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };
    const confirmSubmit = () => {
        setConfirmShow(true);
    };

    return (
        <>
            {status === false && (
                <UnSuccessfulModal
                    message={errorMessage}
                    status={status}
                    setStatus={setStatus}
                />
            )}
            {confirmShow && (
                <ConfirmModal
                    confirmShow={confirmShow}
                    setConfirmShow={setConfirmShow}
                    status={status}
                    setStatus={setStatus}
                    score={score}
                    setScore={setScore}
                    quiz={quiz}
                    username={username}
                    email={email}
                    message={errorMessage}
                    setErrorMessage={setErrorMessage}
                />
            )}

            <div className="userInfo">
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row className="mb-3, userCredentials">
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                        >
                            <Form.Control
                                required
                                type="text"
                                placeholder="User Name"
                                value={username}
                                onChange={changeUsername}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3, userCredentials">
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustomUsername"
                        >
                            {/* <Form.Label>Email</Form.Label> */}
                            <Form.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email}
                                onChange={changeEmail}
                                aria-describedby="inputGroupPrepend"
                                required
                            />
                        </Form.Group>
                    </Row>
                    {/* <Button type="submit">Submit form</Button> */}
                </Form>
            </div>

            <div className="quizContainer">
                <QuizQuestion
                    question={getCurrentQuestion()}
                    quiz={quiz}
                    ind={index}
                />
            </div>
            <div className="navigateButtons">
                <Button
                    variant="success"
                    className="submitButton"
                    type="submit"
                    onClick={confirmSubmit}
                >
                    Submit
                </Button>
            </div>
        </>
    );
};
export default QuizContainer;
