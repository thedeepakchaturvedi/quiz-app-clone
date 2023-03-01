import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';

const OptionContainer = (props) => {
    const {
        i,
        questions,
        setQuestions,
        options,
        setOptions,
        quesIndex,
        quesDeleteState,
    } = props;
    const [optionTitle, setOptionTitle] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const changeHandler = (val) => {
        setOptionTitle(val);

        options[i].title = val;
        setOptions([...options]);

        questions[quesIndex].options = [...options];
        setQuestions([...questions]);
    };
    const changeHandlerSwitch = (checked) => {
        setIsChecked(checked);

        options[i].isAnswer = checked;
        setOptions([...options]);

        //calculate for isMultiple
        let countAnswer = 0;
        options.forEach((ele) => {
            if (ele.isAnswer) {
                countAnswer = countAnswer + 1;
            }
        });

        questions[quesIndex].isMultiple = countAnswer > 1;
        questions[quesIndex].options = [...options];
        setQuestions([...questions]);
    };

    useEffect(() => {
        try {
            setOptionTitle(questions[quesIndex].options[i].title || '');
            setIsChecked(questions[quesIndex].options[i].isAnswer || false);
        } catch {
            // * console.log('First option in array');
        }
    }, [quesDeleteState]);

    return (
        <div className="option-container">
            <div className="ms-3 me-3">
                <Form.Group controlId="optionTextArea">
                    <Form.Label>Option {i + 1}</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={1}
                        onChange={(event) => changeHandler(event.target.value)}
                        value={optionTitle}
                    />
                </Form.Group>
                <Form.Check
                    type="switch"
                    id={'custom-switch' + nanoid()}
                    label={`Is option-${i + 1} correct ?`}
                    onChange={(event) =>
                        changeHandlerSwitch(event.target.checked)
                    }
                    checked={isChecked}
                />
            </div>
        </div>
    );
};

export default OptionContainer;
