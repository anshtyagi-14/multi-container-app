***

# Multi-Container App with Blue-Green Deployment



Welcome to the Multi-Container App repository! This project demonstrates a scalable, highly available application architecture utilizing Docker, Nginx, and MongoDB. It is designed with automated pipelines and zero-downtime deployment strategies.

## Key Features
* **Blue-Green Deployment:** Employs two identical production environments (`app-blue` running `v1` and `app-green` running `v2`) to ensure updates happen with zero downtime.
* **Reverse Proxy:** Uses Nginx to serve the static frontend build and route incoming API traffic to the active application container.
* **Dockerized API:** The backend is fully containerized, ensuring consistency across local and remote environments.
* **Persistent Database:** MongoDB is integrated using Docker volumes (`mongo-data`) so that your data is preserved across container restarts.
* **CI/CD Pipeline Setup:** Features automated testing and deployment workflows to streamline development.
* **Remote Server Configuration:** The `docker-compose.yml` is structured to be easily deployed on any remote cloud server.

## Architecture & Services
* **`app-blue`:** The current stable release container, mapped to port `3001`.
* **`app-green`:** The staging/new release container, mapped to port `3002`.
* **`nginx`:** Listens on port `80`, managing traffic switching between the blue and green environments.
* **`mongo`:** The database service listening on port `27017` with auto-restart policies.

## Getting Started

### Prerequisites
* Docker installed on your machine/server.
* Docker Compose installed.
* Git for version control.

### Installation and Execution
* Clone the repository to your local machine or remote server:
    ```bash
    git clone https://github.com/anshtyagi-14/multi-container-app.git
    cd multi-container-app
    ```
* Ensure that your Nginx configuration file (`./nginx.conf`) and frontend build folder (`./frontend/build`) are present in the root directory.
* Start the multi-container environment in detached mode:
    ```bash
    docker-compose up -d
    ```
* Check the status of your running containers:
    ```bash
    docker ps
    ```

## CI/CD Pipeline
* The continuous integration and continuous deployment pipeline automates the building of your Docker images (e.g., `ansh144/todo-app:v1` and `v2`).
* Upon pushing new code, the pipeline triggers a build, runs necessary tests, and deploys the updated image to the idle environment (Blue or Green).
* Once the new environment is verified, Nginx automatically routes live traffic to the updated container.

## Final Conclusion
This repository serves as a robust template for deploying modern, containerized web applications. By combining a Dockerized API, an Nginx reverse proxy, and persistent MongoDB storage with a Blue-Green deployment strategy, the architecture guarantees high availability and safe, seamless updates. The addition of a CI/CD pipeline makes this setup highly efficient for continuous remote server deployments.
