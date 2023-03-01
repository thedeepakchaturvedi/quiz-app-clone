import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CreateQuiz from './admin/CreateQuiz';
import EditQuiz from './admin/EditQuiz';
import AdminPageContainer from './admin/ListQuiz';
import TakeQuizPreview from './admin/PreviewQuiz';
import QuizReport from './admin/QuizReport';
import ShowSubmission from './user/ShowSubmission';
import TakeQuiz from './user/TakeQuiz';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminPageContainer />} />
                <Route path="/take/:id" element={<TakeQuiz />} />
                <Route path="/create/:id" element={<CreateQuiz />} />
                <Route path="/submit/:id" element={<ShowSubmission />} />
                <Route path="/preview/:id" element={<TakeQuizPreview />} />
                <Route path="/quiz/report/:id" element={<QuizReport />} />
                <Route path="/edit/:id" element={<EditQuiz />} />
            </Routes>
        </Router>
    );
}

export default App;
