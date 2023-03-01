# WEB

This folder contains code for the frontend for the Quiz App.

#### NOTE:

For getting started with the project please look into **[`CONTRIBUTING.md`](../../CONTRIBUTING.md)**.

## Routes

-   **`/`**:

    -   Redirects to `/quiz`

-   **`/quiz`**: `Admin`

    -   Shows List of all Quiz.

-   **`/create/:id`**: `Admin`, `lazy-loaded`

    -   Create a new Quiz

-   **`/quiz/:id`**: `User`

    -   Play Quiz

-   **`/submit/:id`**: `User`, `lazy-loaded`

    -   Show Quiz Submission Result

-   **`/preview/:id`**: `Admin`, `lazy-loaded`

    -   Show Quiz Preview

-   **`/quiz/report/:id`**: `Admin`, `lazy-loaded`

    -   Show report and all the submissions for a particular quiz

-   **`/edit/:id`**: `Admin`, `lazy-loaded`

    -   Edit Quiz.

### Environment Variables

Create `.env` file inside the directory and add the following environment variables.

```.env
VITE_APP_API_URL=<ADD_API_URL>
```
