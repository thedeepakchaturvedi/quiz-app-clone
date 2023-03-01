import { Form } from 'react-bootstrap';

const PointContainer = (props) => {
    const { points, setPoints, questions, setQuestions, quesIndex } = props;
    const changeHandler = (e) => {
        setPoints(e.target.value);
        questions[quesIndex].points = e.target.value;
        setQuestions([...questions]);
    };
    const preventReload = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    };
    return (
        <div>
            <Form.Group
                onKeyDown={preventReload}
                className="point-container"
                controlId="formBasicPoint"
            >
                <Form.Control
                    onChange={changeHandler}
                    type="number"
                    max={10}
                    min={1}
                    placeholder="1-10"
                    value={points}
                />
                <Form.Text className="text-muted">Points</Form.Text>
            </Form.Group>
        </div>
    );
};

export default PointContainer;
