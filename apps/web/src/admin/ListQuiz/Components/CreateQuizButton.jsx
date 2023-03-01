import { nanoid } from 'nanoid';
import { Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CreateQuizButton = () => {
    const navigate = useNavigate();

    const clickHandler = () => {
        navigate(`/create/${nanoid()}`);
    };

    return (
        <div className="create-btn-container">
            <Button
                size="md"
                className=""
                variant="success"
                onClick={clickHandler}
            >
                <div className="content">
                    CREATE NEW QUIZ <FaPlus />
                </div>
            </Button>
        </div>
    );
};

export default CreateQuizButton;
