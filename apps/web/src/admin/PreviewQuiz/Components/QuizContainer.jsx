import axios from 'axios';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import QuizQuestion from './QuizQuestion';

const QuizContainer = (props) => {
    const [index, setIndex] = useState(0);
    const questions = props.quiz.questions;
    const quizDescription = props.quiz.quizDescription;
    console.log(quizDescription);
    const getCurrentQuestion = () => {
        console.log(questions);
        return questions[index];
    };

    return (
        <>
            <div className="userInfo">
                <Form>
                    <Row className="mb-3, userCredentials">
                        <Form.Group
                            as={Col}
                            md="4"
                            controlId="validationCustom01"
                        >
                            {/* <Form.Label>User name</Form.Label> */}
                            <Form.Control
                                required
                                type="text"
                                placeholder="User Name"
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
                    ind={index}
                    questions={questions}
                    quizDescription={quizDescription}
                />
            </div>
            <div className="navigateButtons">
                <Button
                    disabled
                    variant="success"
                    className="submitButton"
                    type="submit"
                >
                    Submit
                </Button>
            </div>
        </>
    );
};
export default QuizContainer;
