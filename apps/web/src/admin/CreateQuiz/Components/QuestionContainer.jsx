import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import AddOptionButton from './AddOptionButton';
import DeleteQuesButton from './DeleteQuesButton';
import OptionContainer from './OptionContainer';
import PointContainer from './PointContainer';

const QuestionContainer = (props) => {
    const { quesDeleteState, setQuesDeleteState } = props;
    const [questionTitle, setQuestionTitle] = useState('');
    const [points, setPoints] = useState(1);
    const [options, setOptions] = useState([]);
    const changeHandlerTitle = (val) => {
        setQuestionTitle(val);
        props.questions[props.ind].title = val;
        props.setQuestions([...props.questions]);
    };

    useEffect(() => {
        setPoints(props.questions[props.ind].points);
        setOptions(props.questions[props.ind].options);
        setQuestionTitle(props.questions[props.ind].title);
    }, [quesDeleteState]);

    return (
        <Form className="question-container">
            <Form.Group
                className="mb-3 ms-3 me-3 mt-3"
                controlId="question-title"
            >
                <div className="label-container">
                    <Form.Label>Question {props.ind + 1}</Form.Label>
                    <PointContainer
                        points={points}
                        setPoints={setPoints}
                        questions={props.questions}
                        setQuestions={props.setQuestions}
                        quesIndex={props.ind}
                    />
                    <DeleteQuesButton
                        quesDeleteState={quesDeleteState}
                        setQuesDeleteState={setQuesDeleteState}
                        questions={props.questions}
                        setQuestions={props.setQuestions}
                        quesIndex={props.ind}
                    />
                </div>

                <Form.Control
                    as="textarea"
                    rows={3}
                    onChange={(event) => changeHandlerTitle(event.target.value)}
                    value={questionTitle}
                />
            </Form.Group>
            <AddOptionButton
                options={options}
                setOptions={setOptions}
                questions={props.questions}
                setQuestions={props.setQuestions}
                quesIndex={props.ind}
            />
            {options.map((ele, i) => {
                return (
                    <OptionContainer
                        i={i}
                        key={`option-${i}`}
                        questions={props.questions}
                        setQuestions={props.setQuestions}
                        options={options}
                        setOptions={setOptions}
                        quesIndex={props.ind}
                        ele={ele}
                        quesDeleteState={quesDeleteState}
                    />
                );
            })}
        </Form>
    );
};

export default QuestionContainer;
