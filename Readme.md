# YouTube Clone Backend API

This is the backend API for a YouTube Clone, built with Node.js, Express, and MongoDB. It handles video uploads, user authentication, comments, likes, and more.

## Features

- **User Authentication**: Sign up, log in, and token-based authentication (JWT).
- **Video Uploads**: Users can upload, update, and delete videos.
- **Video Streaming**: Serve videos with optimized streaming.
- **Comments**: Users can comment on videos, view all comments, and delete their comments.
- **Likes & Dislikes**: Users can like or dislike videos and view total counts.
- **Subscriptions**: Users can subscribe to channels and get updates.
- **Playlists**: Create and manage playlists.
- **Search**: Search for videos by title, tags, or description.

## Technologies Used

- **Node.js**: JavaScript runtime for building server-side applications.
- **Express.js**: Web framework for handling routes, middleware, and HTTP requests.
- **MongoDB**: NoSQL database to store user, video, and comment data.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB, simplifies interactions with the database.
- **JWT**: Token-based user authentication.
- **Multer**: For handling file uploads (e.g., videos, thumbnails).
- **Cloud Storage**: (Optional) Cloud storage integration for video hosting.