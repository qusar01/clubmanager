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
git clone https://github.com/qusar01/clubmanager.git
cd clubmanager
```

### 2. Configure Application Properties
Before running the application, set the necessary values in `application.properties`:

#### Database Configuration:
```
spring.datasource.url=jdbc:postgresql://localhost:5432/postgres
spring.datasource.username=admin
spring.datasource.password=admin
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
```

#### JWT Configuration:
```
security.jwt.secret-key=your-secret-key
security.jwt.expiration-time=your-expiration-time
```

#### Mail Configuration:
```
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.username=your-email@gmail.com
spring.mail.password=your-email-password
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true
```

#### Payments Configuration (Stripe):
```
stripe.pk=your-public-key
stripe.sk=your-secret-key
```

### 3. Start the Database (Docker Compose)
To start the PostgreSQL database, use the following command:
```bash
docker-compose up -d
```
This command will start PostgreSQL in a Docker container.

### 4. Run the Backend (Spring Boot)
Navigate to the backend directory and start the application:
```bash
cd backend/clubmanager
./mvnw spring-boot:run
```

The backend application will run on port `8080` by default.

### 5. Run the Frontend (React.js)
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
