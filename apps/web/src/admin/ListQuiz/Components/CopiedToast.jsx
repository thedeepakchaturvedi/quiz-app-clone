import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

const CopiedToast = (props) => {
    const { showToast, setShowToast } = props;
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: 2000,
                margin: 10,
                zIndex: 9999,
                float: 'right',
            }}
        >
            <Row>
                <Col xs={6}>
                    <Toast
                        onClose={() => setShowToast(false)}
                        show={showToast}
                        delay={2000}
                        autohide
                    >
                        <Toast.Header>
                            <strong
                                className="me-auto"
                                style={{ color: 'green' }}
                            >
                                Quiz Link Copied!
                            </strong>
                            <small>now</small>
                        </Toast.Header>
                        <Toast.Body style={{ color: 'black' }}>
                            Share the link to play the quiz
                        </Toast.Body>
                    </Toast>
                </Col>
            </Row>
        </div>
    );
};

export default CopiedToast;
