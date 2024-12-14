
# Authentication-using-nodejs

**Authentication-using-nodejs** is a Node.js application designed for user authentication. It includes user registration, login functionalities, and session management. The project uses Express for routing, EJS for templating, and MongoDB with Mongoose for data handling.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Routes](#routes)
- [Example Code](#example-code)
- [Contributing](#contributing)
- [License](#license)

## Installation

To set up the project on your local machine, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/Authentication-using-nodejs.git
    cd Authentication-using-nodejs
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

## Usage

To start the application, use the following command:

```bash
npm start
```

This command will start the server with Nodemon, which watches for file changes and restarts the server automatically. By default, the server runs on `http://localhost:3000`.

## Features

- **User Signup and Login**: Secure user authentication using JSON Web Tokens (JWT).
- **Session Management**: Manage user sessions with cookies.
- **Error Handling**: Handle and display appropriate error messages for authentication issues.

## Dependencies

The project uses the following npm packages:

- **[Express](https://www.npmjs.com/package/express)**: A web application framework for Node.js.
- **[EJS](https://www.npmjs.com/package/ejs)**: Templating engine for rendering HTML views.
- **[Mongoose](https://www.npmjs.com/package/mongoose)**: MongoDB object modeling tool for Node.js.
- **[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)**: Library for creating and verifying JSON Web Tokens.
- **[cookie-parser](https://www.npmjs.com/package/cookie-parser)**: Middleware to parse cookies.
- **[express-session](https://www.npmjs.com/package/express-session)**: Middleware for handling sessions in Express.
- **[uuid](https://www.npmjs.com/package/uuid)**: Utility for generating unique identifiers.
- **[Nodemon](https://www.npmjs.com/package/nodemon)**: Tool for auto-reloading the server during development.

## Routes

- **`GET /`**: Renders the homepage.
- **`POST /signup`**: Handles user registration. Requires `username`, `email`, and `password` in the request body.
- **`POST /login`**: Handles user login. Requires `email` and `password` in the request body.

## Example Code

**Signup Handler:**

```javascript
function handleSignup(req, res) {
    const { password, email, username } = req.body;

    SignupDetails.create({ password, email, username })
        .then(() => {
            res.redirect('/');
        })
        .catch((error) => {
            res.status(500).send("Error creating user: " + error.message);
        });
}
```

**Login Handler:**

```javascript
async function handleLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await SignupDetails.findOne({ email: email });

        if (user) {
            if (user.password === password) {
                console.log("Login successful");

                const token = setuser(user);
                res.cookie("user1", token);
                
                const newThought = await UsersData.create({
                    userId: user.username,
                    thought: 'This is a new thought'
                });
                console.log(newThought);
                res.render('logged', { user });
            } else {
                res.render('homepage', { error: "Invalid password" });
            }
        } else {
            res.render('homepage', { error: "Invalid email" });
        }
    } catch (err) {
        console.error("Error occurred:", err);
        res.render('homepage', { error: "Error occurred: " + err.message });
    }
}
```

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/my-feature`).
5. Create a pull request.

## License

This project is licensed under the ISC License. See the `LICENSE` file for details.

---

Feel free to modify any sections based on your specific project needs!
