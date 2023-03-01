import { format } from 'date-fns';
import React from 'react';

const UserList = ({ submission }) => {
    return (
        <div className="report-quizflexcontainer">
            <div className="report-user-list">
                <div className="report-user-name">{submission.username}</div>
                <div className="report-createdAt">
                    {format(new Date(submission.createdAt), 'dd MMM yyyy')}
                </div>
                <div className="report-user-score">
                    Correct Ans: {submission.correctQuestions}
                </div>
                <div className="report-total-score">
                    Score: {submission.score + '/' + submission.totalScore}
                </div>
            </div>
        </div>
    );
};

export default UserList;
