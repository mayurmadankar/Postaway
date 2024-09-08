# Postaway Social Media API

Postaway is a social media platform API built using Express.js and MongoDB, designed to enable users to perform various social networking activities such as registration, authentication, post creation, commenting, liking, managing friendships, and more. The API supports secure user authentication with JWT, file uploads, and OTP-based password reset for enhanced security. It follows a scalable and modular architecture, making it easy to maintain and extend.

## Features

- **User Management**: Users can register, log in, and manage their profiles.
- **Post Creation**: Allows users to create, update, and delete posts with captions and images.
- **Commenting System**: Users can add, update, and delete comments on posts.
- **Liking System**: Users can like posts, with real-time like counts displayed.
- **File Upload**: Supports uploading user avatars and post images.
- **Friendship Features**: Users can send, accept, and manage friend requests.
- **OTP-Based Password Reset**: Secure OTP-based password reset functionality using Nodemailer.
- **Error Handling**: Centralized error handling with custom error messages and HTTP status codes.
- **Authentication**: Secure user authentication with JSON Web Tokens (JWT).
- **Security Measures**: Implements input validation, data sanitization, and password hashing for enhanced security.
- **Modular Code Architecture**: Scalable, modular structure using Express.js and ES6 modules.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mayurmadankar/Postaway.git
   cd postaway-api
   ```

2. Install dependencies:
   **npm install**

3. Start the server:
   **npm start**

## API Endpoints

### User Routes

- **POST /api/user/signup**: Register a new user account.
- **POST /api/user/signin**: Log in as a user.
- **POST /api/user//api/users/logout**: Logout the user.
- **POST /api/users/logout-all-devices**: logout all devices
- **POST /api/user/upload-avatar**: Upload user avatar.
- **GET /api/users/get-details**: Get user details.
- **GET /api/users/get-all-details**:Get all user details.
- **GET /api/users/update-details**:Update the Details.

### Post Routes

- **POST /api/posts**: Create a new post.
- **POST /api/posts/upload-image**: Upload post image.
- **GET /api/posts**: Retrieve all posts.
- **GET /api/posts/:id**: Retrieve a specific post by ID.
- **PUT /api/posts/:id**: Update a specific post by ID.
- **DELETE /api/posts/:id**: Delete a specific post by ID.

### Comment Routes

- **POST /api/comments**: Create a new comment.
- **GET /api/comments**: Retrieve all comments for a specific post.
- **PUT /api/comments/:id**: Update a specific comment by ID.
- **DELETE /api/comments/:id**: Delete a specific comment by ID.

### Like Routes

- **POST /api/likes**: Add a like to a post.
- **DELETE /api/likes/:id**: Remove a like from a post.
- **POST /api/likes/toggle/:id**:Toggle the like.
- **GET /api/likes/:postId**: Retrieve all likes for a specific post.

## Technologies Used

- **Node.js**: Backend JavaScript runtime for building the application.
- **Express.js**: Web framework used for creating scalable and modular RESTful APIs.
- **MongoDB**: NoSQL database for managing user data, posts, comments, likes, and friendships.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **JSON Web Tokens (JWT)**: For secure user authentication and authorization.
- **Multer**: Middleware for handling file uploads (e.g., user avatars, post images).
- **Nodemailer**: For sending OTP-based password reset emails.
- **bcrypt.js**: For hashing and securing user passwords.
- **Validator.js**: For input validation and sanitization to ensure security.
- **ES6 Modules**: For maintaining a modular and organized code structure.


## Contributing

Contributions to the Postaway API are welcome! Feel free to fork the repository, make improvements, and submit pull requests for new features or bug fixes.

## License

This project is licensed under the MIT License. Feel free to use and modify it as per your requirements.

---

Feel free to customize this README file according to your project's specific details and requirements.

## Authors

- [Mayur Madankar](https://github.com/mayurmadankar)

## Contact me

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mayur-madankar/) [![LeetCode](https://img.shields.io/badge/-LeetCode-FFA116?style=for-the-badge&logo=LeetCode&logoColor=black)](https://leetcode.com/u/mayurmadankar/) [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:madankarmayur5@gmail.com)
[![Naukari](https://img.shields.io/badge/Naukri.com-0A66C2?style=for-the-badge&logo=Naukri.com&logoColor=white)](https://www.naukri.com/mnjuser/profile?id=&altresid)
