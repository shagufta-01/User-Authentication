# Authentication using Node.js

This project demonstrates how to implement **user authentication** using **Node.js**, **Express.js**, **JWT (JSON Web Tokens)**, and **MongoDB**. It allows users to register, log in, and access protected routes with secure, token-based authentication.

## Features

- User registration with email and password.
- Login with JWT authentication.
- Secure password hashing using **bcrypt**.
- Token-based authentication for protected routes.
- Simple error handling and validation.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v14 or higher)
- **MongoDB** (or use MongoDB Atlas for cloud storage)
- **Postman** (or any API testing tool)

## Installation

Follow these steps to get the project up and running locally:

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/authentication-using-nodejs.git
cd authentication-using-nodejs
```

### 2. Install Dependencies

Run the following command to install required dependencies:

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret-key>
PORT=5000
```

Replace `<your-mongodb-uri>` with your MongoDB connection string (e.g., **MongoDB Atlas** for cloud database) and `<your-jwt-secret-key>` with a secure string for JWT token signing.

### 4. Start the Server

```bash
npm start
```

The server will run on `http://localhost:5000`.

## API Endpoints

### 1. Register User

- **Endpoint**: `/api/auth/register`
- **Method**: `POST`
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

- **Response**:
  - `200 OK` for successful registration.
  - `400 Bad Request` for missing or invalid input.

### 2. Login User

- **Endpoint**: `/api/auth/login`
- **Method**: `POST`
- **Request Body**:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

- **Response**:
  - `200 OK` with the JWT token if login is successful.
  - `400 Bad Request` for invalid credentials.

### 3. Protected Route

- **Endpoint**: `/api/protected`
- **Method**: `GET`
- **Headers**: 
  - `Authorization: Bearer <your-jwt-token>`
- **Response**:
  - `200 OK` for authenticated users.
  - `401 Unauthorized` for users without a valid token.

## Example Usage

### 1. Register a User

Send a `POST` request to `/api/auth/register` with the following body:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

### 2. Login and Get JWT Token

Send a `POST` request to `/api/auth/login` with the following body:

```json
{
  "email": "user@example.com",
  "password": "your-password"
}
```

The response will include a **JWT token**:

```json
{
  "token": "your-jwt-token"
}
```

### 3. Access Protected Route

Send a `GET` request to `/api/protected` with the **Authorization** header:

```bash
Authorization: Bearer your-jwt-token
```

The response will return a success message if the token is valid:

```json
{
  "message": "Access granted to protected route."
}
```

## Example Code

### Server Code (`server.js`)

```javascript
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// User Registration Endpoint
app.post('/api/auth/register', async (req, res) => {
    const { email, password } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    
    await newUser.save();
    res.status(200).json({ message: 'User registered successfully' });
});

// User Login Endpoint
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
});

// Protected Route
app.get('/api/protected', (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Access granted to protected route.' });
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
```

### User Model (`models/User.js`)

```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
```

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database to store user data.
- **JWT (JSON Web Tokens)**: For secure user authentication and authorization.
- **bcryptjs**: Library to hash and compare passwords securely.

## Contributing

Feel free to fork the repository and submit issues or pull requests for improvements. If you find a bug or have suggestions for new features, please open an issue.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides clear instructions on how to set up, run, and test the authentication project with relevant code snippets for each step.
