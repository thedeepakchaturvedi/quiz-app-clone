import Button from 'react-bootstrap/Button';

const AddOptionButton = (props) => {
    const clickHandler = () => {
        const { options, setOptions, questions, setQuestions, quesIndex } =
            props;
        setOptions([...options, { title: '', isAnswer: false }]);

        questions[quesIndex].options = [...options];
        setQuestions([...questions]);
    };
    return (
        <div className="option-btn-container">
            <Button
                className="mb-3 ms-3 me-3"
                variant="primary"
                onClick={clickHandler}
            >
                ADD OPTION
            </Button>
        </div>
    );
};

export default AddOptionButton;
