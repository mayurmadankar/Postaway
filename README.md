# Postaway Social Media API

Postaway is a social media platform API built using Express.js, designed to enable users to perform various social networking activities such as registration, authentication, post creation, commenting, liking, and more.

## Features

- **User Management**: Register and authenticate users.
- **Post Creation**: Users can create posts with text and media.
- **Commenting**: Users can comment on posts.
- **Liking**: Users can like posts.
- **File Upload**: Supports file upload for user avatars and post images.
- **Error Handling**: Graceful handling of errors with appropriate HTTP status codes and error messages.
- **Authentication**: Implements JSON Web Tokens (JWT) for user authentication.
- **Security**: Ensures security measures like data validation and input sanitization.
- **Scalable Architecture**: Uses Express.js for a scalable and modular architecture.

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
- **POST /api/user/upload-avatar**: Upload user avatar.

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
- **GET /api/likes/:postId**: Retrieve all likes for a specific post.

## Technologies Used

- Express.js
- JSON Web Tokens (JWT)
- Multer

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
