# Todo List Application

## 🚀 Live Demo
[View the live app here](https://todo-list-manger.netlify.app/)

A simple Todo List application built with Spring Boot (Java 17) for the backend. This project provides a RESTful API for managing todo items, supporting basic CRUD operations. It is designed to be used with a frontend (such as React) and is ready for deployment.
## Features
- Add, update, delete, and list todo items
- CORS enabled for local and deployed frontends
- MySQL database integration (configurable)
- RESTful API design

## Technology Stack
- Java 17
- Spring Boot 3.5.0
- Spring Data JPA
- MySQL (or any JPA-compatible DB)
- Maven

## Getting Started

### Prerequisites
- Java 17+
- Maven
- MySQL (or another database)

### Setup
1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd todo
   ```
2. **Configure the application:**
   Edit `src/main/resources/application.properties` to set your database and other properties. Example:
   ```properties
   spring.application.name=todo
   spring.datasource.url=jdbc:mysql://localhost:3306/tododb
   spring.datasource.username=your_db_user
   spring.datasource.password=your_db_password
   spring.jpa.hibernate.ddl-auto=update
   ```
   > **Note:** By default, only `spring.application.name` is set. You must add your database connection properties as shown above.

3. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
   The backend will start on `http://localhost:8080` by default.

## API Endpoints

| Method | Endpoint         | Description                |
|--------|------------------|----------------------------|
| POST   | `/todos`         | Create a new todo          |
| GET    | `/todos`         | Get all todos              |
| PUT    | `/todos/{id}`    | Update a todo by ID        |
| DELETE | `/todos/{id}`    | Delete a todo by ID        |
| GET    | `/ping`          | Health check (returns pong)|

### Todo Object Structure
```json
{
  "id": 1,
  "title": "Sample Todo",
  "description": "Details about the task",
  "completed": false
}
```

## CORS & Frontend Configuration
- CORS is enabled for:
  - `http://localhost:3000` (local frontend)
  - `https://todo-list-application-production.up.railway.app` (deployed frontend)
- To allow other frontends, update the `@CrossOrigin` annotation in `ToDoController.java`:
  ```java
  @CrossOrigin(origins = { "http://localhost:3000", "https://your-frontend-url" })
  ```

## Customization
- **Backend API URL:** The backend runs on `http://localhost:8080` by default. Change the port in `application.properties` if needed:
  ```properties
  server.port=8080
  ```
- **Frontend API URL:** Update your frontend code to point to the backend API (e.g., `http://localhost:8080/todos`).
- **Database:** Set your DB connection in `application.properties` as shown above.

## Project Structure
```
todo/
├── src/
│   ├── main/
│   │   ├── java/com/Todo/todo/
│   │   │   ├── controller/ToDoController.java
│   │   │   ├── entity/ToDo.java
│   │   │   ├── repo/ToDoRepository.java
│   │   │   └── service/ToDoService.java
│   │   └── resources/
│   │       ├── application.properties
│   │       ├── static/
│   │       └── templates/
│   └── test/
│       └── java/com/Todo/todo/TodoApplicationTests.java
├── pom.xml
└── README.md
```

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
This project is open source and available under the [MIT License](LICENSE).
