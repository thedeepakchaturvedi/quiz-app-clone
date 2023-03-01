import React, { lazy, Suspense } from 'react';
import {
    BrowserRouter as Router,
    Navigate,
    Route,
    Routes,
} from 'react-router-dom';
import { Loading } from 'ui';

import AdminPageContainer from './admin/ListQuiz';
// import TakeQuiz from './user/TakeQuiz';

const QuizReport = lazy(() => import('./admin/QuizReport'));
const EditQuiz = lazy(() => import('./admin/EditQuiz'));
const TakeQuizPreview = lazy(() => import('./admin/PreviewQuiz'));
const CreateQuiz = lazy(() => import('./admin/CreateQuiz'));
const ShowSubmission = lazy(() => import('./user/ShowSubmission'));
const TakeQuiz = lazy(() => import('./user/TakeQuiz'));

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<AdminPageContainer />} />

                <Route
                    path="/create/:id"
                    element={
                        <Suspense fallback={<Loading message="Loading..." />}>
                            <CreateQuiz />
                        </Suspense>
                    }
                />
                <Route
                    path="/submit/:id"
                    element={
                        <Suspense fallback={<Loading message="Loading..." />}>
                            <ShowSubmission />
                        </Suspense>
                    }
                />
                <Route
                    path="/preview/:id"
                    element={
                        <Suspense fallback={<Loading message="Loahreya is talking
2 people inding..." />}>
                            <TakeQuizPreview />
                        </Suspense>
                    }
                />
                <Route
                    path="/quiz/report/:id"
                    element={
                        <Suspense fallback={<Loading message="Loading..." />}>
                            <QuizReport />
                        </Suspense>
                    }
                />
                <Route
                    path="/edit/:id"
                    element={
                        <Suspense fallback={<Loading message="Loading..." />}>
                            <EditQuiz />
                        </Suspense>
                    }
                />
                <Route path="/take/quiz/:id" element={
                        <Suspense fallback={<Loading message="Loading..." />}>
                            <TakeQuiz />
                        </Suspense>
                    } />
            </Routes>
        </Router>
    );
}

export default App;
