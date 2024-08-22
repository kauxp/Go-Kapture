# Go Kapture

## Overview

Go Kapture is a task management system built using Node.js, Express, Sequelize (with MySQL), and Docker. The application supports user authentication with role-based access control, task management with CRUD operations, task filtering and searching, and pagination. Additionally, the project is containerized using Docker, making it easy to deploy and manage in different environments.

## Features

- **User Authentication**: Secure user registration and login, with role-based access control (Admin and User roles).
- **Task Management**: CRUD operations for managing tasks, with the ability to assign tasks to specific users.
- **Filtering and Searching**: Filter tasks based on status, priority, and due date. Search tasks by title or description.
- **Pagination**: Pagination support for task lists to efficiently manage large datasets.
- **CI/CD Pipeline**: Automated testing and deployment using CI/CD pipelines with GitHub Actions or Travis CI.

## Project Structure

- **Models**: Defines the data structure and relationships using Sequelize.
- **Controllers**: Handles the business logic for various operations (e.g., creating, updating, deleting tasks).
- **Routes**: Maps HTTP requests to the appropriate controller functions.
- **Middlewares**: Includes authentication and authorization logic.
- **Tests**: Unit and integration tests to ensure the reliability of the API endpoints.

## Docker Setup

The project is containerized using Docker, making it easy to set up and run in any environment. The `Dockerfile` defines the container configuration, and `docker-compose.yml` helps in setting up the application along with necessary services like the MySQL database.

## Running the Project

### Prerequisites

- Node.js v20.5.0
- Docker

### Steps to Run

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/gokapture.git
   cd gokapture
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a .env file with the following variables:
   ```bash
    DATABASE_URL=mysql://username:password@localhost:3036/gokapture
    PORT=
   ```

4. **Run the application**:
    ```bash
   npm start
   ```

5. **Run with Docker**:
    ```bash
   docker-compose up --build
   ```

## API Documentation
  API documentation is available via Swagger UI at `/api-docs` when the application is running.


## Assumptions Made
- The application assumes that the PostgreSQL database is accessible with the credentials provided in the environment variables.

- Role-based access control is implemented with the assumption that only Admin users can perform certain operations (e.g., creating, updating, deleting tasks).

- Pagination defaults to 10 items per page unless specified otherwise.

## CI/CD Pipeline
  The project includes a CI/CD pipeline configured using GitHub Actions. This pipeline runs tests on each push and can deploy the application to a staging or production environment.

