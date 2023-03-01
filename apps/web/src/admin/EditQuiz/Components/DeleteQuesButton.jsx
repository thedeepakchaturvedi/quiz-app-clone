import { Button } from 'react-bootstrap';
const DeleteQuesButton = (props) => {
    const {
        quesDeleteState,
        setQuesDeleteState,
        questions,
        setQuestions,
        quesIndex,
    } = props;
    const clickHandler = (event) => {
        setQuesDeleteState(quesDeleteState + 1);
        const newArray = questions.filter((ele, i) => i != quesIndex);
        setQuestions(newArray);
    };

    return (
        <div className="delete-btn-container mb-2">
            <Button
                variant="danger"
                className="btn-primary"
                onClick={clickHandler}
            >
                DELETE QUESTION
            </Button>
        </div>
    );
};

export default DeleteQuesButton;
