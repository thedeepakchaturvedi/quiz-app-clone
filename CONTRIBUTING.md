# Quiz App

A web application to create, list, and play quizzes.

## Getting Started

### Prerequisite

-   [NodeJS](https://nodejs.org)

### Installing Dependencies

-   Installing all dependencies

    ```sh
    npm install
    ```

-   Installing a new dependencies

    -   For `api`

    ```sh
    npm i <package name> -w api
    ```

    -   For `web`

    ```sh
    npm i <package name> -w web
    ```

### Scripts

-   Run in development

    ```sh
    npm run dev
    ```

-   Build the apps

    ```sh
    npm run build
    ```

-   Format (NOTE: RUN THIS BEFORE EVERY COMMIT)

    ```sh
    npm run format
    ```

-   Clean dependencies and build files

    ```sh
    npm run clean
    ```

-   Add dummy data to the DB

    ```sh
    npm run import:db -w api
    ```

    **Note: To add dummy data start the database and server before running the command**

### Environment Variables

-   Api
    Create `.env` file inside the `./apps/api` directory and add the following environment variables.

    ```.env
    MONGO_URL=<DATABASE_URL>
    PORT=<SERVER_PORT>
    ```

-   Web
    Create `.env` file inside the `./apps/web` directory and add the following environment variables.

    ```.env
    VITE_APP_API_URL=<ADD_API_URL>
    ```

### Docker

1. For development purpose (MongoDB only)

    - This starts only the `mongo` service(`MongoDB` instance).
    - Can use `-d` flag for it to be `detached` from terminal.

    ```sh
    docker-compose up
    ```

2. For production build

    - This starts all the services: `api`, `web`, `mongo`
    - Can use `-d` flag for it to be `detached` from terminal.

    ```sh
    docker-compose -f docker-compose.production.yml up
    ```
