import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import './style.css';

type Props = {
    message: string;
};

export const Loading: React.FC<Props> = ({ message }) => {
    return (
        <div className="loading-ui">
            <Spinner animation="grow" />
            <p>{message}</p>
        </div>
    );
};
