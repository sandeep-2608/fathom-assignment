# Assignment
A simple RESTful API for managing ships, built with Node.js, Express, MongoDB, and JWT authentication. This project allows users to perform CRUD operations on ship records and includes comprehensive input validation and secure authentication for modifying data.

## Features
### - CRUD Operations: Create, read, update, and delete ships

### - Endpoints:

  * GET /ships — List all ships with details (no pagination)
  
  * POST /ships — Add a new ship (protected)
  
  * GET /ships/:id — Get a specific ship by ID
  
  * PUT /ships/:id — Update ship by ID (protected)
  
  * DELETE /ships/:id — Delete ship by ID (protected)

### - Data Validation: 
  Name and other fields required and validated; captain email must be a valid email

### - JWT Authentication: 
  Required for POST, PUT, DELETE endpoints; user registration and login supported

### - Error Handling: 
  Returns appropriate status codes and messages (400 for validation errors, 404 for not found, etc.)

### - Database: MongoDB with Mongoose

### - Testing: Postman collection provided for all endpoints

## Getting Started
### Prerequisites
* Node.js (v18 or higher)

* MongoDB (local instance or MongoDB Atlas)

* npm

### Installation & Setup
1. Clone this repository or copy code files into a directory

2. Install dependencies

```
npm install
```
3. Configure environment variables
Create a .env file with your settings:

```
MONGODB_URI=mongodb://localhost:27017/ships_db
JWT_SECRET=your_secret_key
PORT=3000
```
4. Run MongoDB (locally or specify Atlas URI in .env)

5. Start the server

```
npm run dev     # For development (with nodemon)
```
The API will be available at http://localhost:3000/

## API Endpoints
- GET	/api/v1/ships	Fetch all ships	
- POST	/api/v1/ships	Add a new ship	
- GET	/api/v1/ships/:id	Get ship by ID	
- PUT	/api/v1/ships/:id	Update ship by ID	
- DELETE	/api/v1/ships/:id	Delete ship by ID	

## Authentication Endpoints
- POST	/api/v1/auth/register	Register a new user
- POST	/api/v1/auth/login	User login (returns JWT)
- GET	/api/v1/auth/test	Get current user info

## Example Requests
```
# Register a new user
curl -X POST http://localhost:3000/api/v1/auth/register \
 -H "Content-Type: application/json" \
 -d '{"username":"admin","email":"admin@example.com","password":"password123"}'

# Login to get JWT token
curl -X POST http://localhost:3000/api/v1/auth/login \
 -H "Content-Type: application/json" \
 -d '{"email":"admin@example.com","password":"password123"}'

# Create a ship (requires JWT token from login)
curl -X POST http://localhost:3000/api/v1/ships \
 -H "Content-Type: application/json" \
 -H "Authorization: Bearer YOUR_JWT_TOKEN" \
 -d '{
   "name":"Ocean Explorer",
   "type":"cargo",
   "capacity":50000,
   "port":"Mumbai Port",
   "status":"active"
 }'

# Get all ships
curl -X GET http://localhost:3000/api/v1/ships
```
## Data Model
1. Ship
```   
{
  name: String,         // required, min 2 chars
  type: String,         // required, enum
  capacity: Number,     // required, min 1
  port: String,         // required
  status: String,       // enum, default "active"
  createdAt: Date,
  updatedAt: Date
}
```
User
```
javascript
{
  username: String,     // required, unique
  email: String,        // required, valid email
  password: String,     // required (hashed)
  role: String          // "admin" or "user", default "user"
}
```
## Error Handling
- 400 Bad Request: Validation errors

- 401 Unauthorized: Auth/token errors

- 404 Not Found: Ship/user not found

- 500 Internal Server Error: Server errors
  
## Testing with Postman
Use the URL for the Postman collection.

[Postman](https://web.postman.co/workspace/979e83d3-dd8c-44fa-8c47-37736177b622/collection/27138398-fa1a33fa-51c5-4b9d-a564-8f7d69324fd6?action=share&source=copy-link&creator=27138398)


## Stack
* Node.js
* Express
* MongoDB (Mongoose)
* JWT Auth
* Joi Validation

