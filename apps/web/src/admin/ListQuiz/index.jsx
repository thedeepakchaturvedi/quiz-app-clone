import React from 'react';
import CreateQuizButton from './Components/CreateQuizButton';
import ListQuizContainer from './Components/ListQuizContainer';
import './styles/adminListStyles.css';

const AdminPageContainer = () => {
    return (
        <div className="adminpage-container">
            <div className="create-btn-class">
                <CreateQuizButton />
            </div>

            <div className="listing-quiz-app">
                <ListQuizContainer />
            </div>
        </div>
    );
};

export default AdminPageContainer;
