# Development of a REST API for the 'Edu Course' Application using Node.js and Express.js

This project aims to build the server-side (back-end) of the "Edu Course" application using the Node.js and Express.js framework. The development process includes several key stages, from configuring the database connection, implementing Data Manipulation Language (DML) functions for data operations (SELECT, INSERT, UPDATE, DELETE), to building a functional REST API with corresponding endpoints. Each endpoint was tested using Postman to ensure all features work as expected.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to get your development environment set up and running.

### 1. Clone the repository

```sh
git clone <https://github.com/zainnn21/backend2.git>
cd <backend2>
```

### 2. Configure Environment Variables

The application uses environment variables for database configuration. You'll need to create a `.env` file in the root of the project.

You can copy the example file:

```sh
cp .env.example .env
```

**Note:** The `DB_PORT` should be `5432` as this is the port the `db` service uses internally within the Docker network. The host machine will access the database via port `5433`.

### 3. Build and Run the Application

Use Docker Compose to build the images and start the services.

```sh
docker-compose up --build
```

To run the services in the background (detached mode), use:

```sh
docker-compose up --build -d
```

### 4. Accessing the Services

- **Application**: The application will be running and accessible at `http://localhost:3000`.
- **Database**: The PostgreSQL database can be accessed from your host machine on `localhost:5433`.

#### Using DBeaver (or other SQL Client)

You can connect to the PostgreSQL database using any SQL client. Here are the settings for DBeaver:

1.  Open DBeaver and create a new connection (`File > New > Database Connection`).
2.  Select **PostgreSQL**.
3.  On the "Main" tab, fill in the connection details:
    - **Host**: `localhost`
    - **Port**: `5433`
    - **Database**: The value of `POSTGRES_DB` from your `.env` file (e.g., `edu_course_db`).
    - **Username**: The value of `POSTGRES_USER` from your `.env` file (e.g., `user`).
    - **Password**: The value of `POSTGRES_PASSWORD` from your `.env` file (e.g., `password`).
4.  Click "Test Connection..." to verify, then click "Finish".

### Database Initialization

On the first run, Docker Compose will automatically initialize the database. The `docker-compose.yml` file mounts the `./src/init` directory into the PostgreSQL container's initialization path (`/docker-entrypoint-initdb.d`). Any `.sql` scripts in that directory will be executed to create tables and seed initial data.

The `init.sql` script will create the following tables:

- `roles`
- `user_base`
- `profile_user`
- `course_categories`
- `course_base`
- `orders`
- `order_item`
- `purchased_course`
- `review_course`
- `section_course`
- `lesson_section`
- `lesson_content`

## API Endpoints & Testing

This API provides several endpoints to manage course data.

### Endpoints

Here is a summary of the available endpoints for the `course` resource:

-   `GET /course`: Get all course data.
-   `GET /course/:id`: Get a specific course by ID.
-   `POST /course`: Create a new course.
-   `PUT /course/:id`: Update an existing course.
-   `DELETE /course/:id`: Delete a course.

### Stopping the Application

To stop and remove the containers, networks, and volumes, run:

```sh
docker-compose down
```
