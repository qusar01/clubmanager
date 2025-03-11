# Club Manager

Club Manager is an application for managing a sports club, providing features for training management, events, members, and membership fee payments.

## Technologies
- **Backend:** Java, Spring Boot
- **Frontend:** JavaScript, React.js
- **Database:** PostgreSQL
- **Containerization:** Docker, Docker Compose

## Running the Project

### 1. Clone the Repository
```bash
git clone https://github.com/qusar01/clubmanager
cd clubmanager
```

### 2. Start the Database (Docker Compose)
To start the PostgreSQL database, use the following command:
```bash
docker-compose up -d
```
This command will start PostgreSQL in a Docker container.

### 3. Run the Backend (Spring Boot)
Navigate to the backend directory and start the application:
```bash
cd backend/clubmanager
./mvnw spring-boot:run
```

The backend application will run on port `8080` by default.

### 4. Run the Frontend (React.js)
Navigate to the frontend directory and start the application:
```bash
cd frontend/clubmanager
npm install  # Install dependencies
npm run dev    # Start the application
```

The frontend application will run on port `3000` by default.

## Author
Oskar Baranowski

## License
This project is available under the GNU General Public License v3.0.
