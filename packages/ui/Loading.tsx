import * as React from 'react';
import Spinner from 'react-bootstrap/Spinner';

type Props = {
    message: string;
};

export const Loading: React.FC<Props> = ({ message }) => {
    return (
        <>
            <Spinner animation="grow" />
            <p>{message}</p>
        </>
    );
};
