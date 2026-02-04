# CI/CD Course Project – Contact Form Application

## Overview
This project demonstrates the basic concepts of **Continuous Integration (CI)** and **Continuous Deployment (CD)** using a simple full-stack web application.

The application consists of a React frontend and a Node.js (Express) backend. A CI/CD pipeline is configured using **GitHub Actions** to automatically build and test the application whenever code is pushed to the repository.

The goal of this project is not complexity, but to understand how automation helps ensure code quality and consistency in a real-world DevOps workflow.

---

## Application Description

### Frontend (React)
- Simple contact form with:
  - Name
  - Email
  - Message
- Client-side validation
- Success and error feedback after submission

### Backend (Node.js + Express)
- Minimal REST API
- Endpoints:
  - `GET /api/health` – Health check endpoint
  - `POST /api/contact` – Handles contact form submissions
- Submissions are logged to the console (no database used)

---

## Project Structure

├── backend/
│ ├── index.js
│ ├── package.json
│ └── tests/
├── frontend/
│ ├── src/
│ ├── package.json
│ └── public/
├── .github/workflows/
│ └── ci.yml
├── docker-compose.yml
└── README.md


---

## CI/CD Pipeline

The CI/CD pipeline is implemented using **GitHub Actions** and includes the following stages:

1. **Code Commit**
   - Pipeline is triggered on every push to the `main` branch.

2. **Build Stage**
   - Installs dependencies for both frontend and backend.

3. **Test Stage**
   - Runs automated tests for:
     - Backend API (Jest + Supertest)
     - Frontend components (Jest + React Testing Library)

4. **Deployment (Simulated)**
   - The pipeline verifies that the application is build-ready.
   - Docker is used for local deployment to demonstrate containerization.

---

## Docker Support

The project includes **Docker** and **Docker Compose** to run the frontend and backend in isolated containers.

### Run the application with Docker:
```bash
docker-compose up --build
