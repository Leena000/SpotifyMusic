# 🎵 Spotify Music Backend API

A Spotify-inspired backend application built using **Node.js**, **Express.js**, and **MongoDB**. This project provides secure user authentication, role-based authorization, music upload, album management, and RESTful APIs.

The application allows users to register, log in securely using JWT authentication, upload music as artists, create albums, and manage music content through protected APIs.

---

# 🚀 Features

### Authentication
- User Registration
- User Login
- User Logout
- Password Encryption using bcrypt
- JWT Authentication
- Cookie-based Authentication

### Authorization
- User Role
- Artist Role
- Protected Routes using Middleware
- Role-Based Access Control

### Music Management
- Upload Music
- Get All Music
- Get Music by ID

### Album Management
- Create Album
- Get All Albums
- Get Album by ID

### File Upload
- Upload Audio Files using Multer
- Store Music Metadata

### Database
- MongoDB
- Mongoose ODM
- Schema Validation

---

# 🛠 Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT
- bcryptjs
- Cookie Parser

### File Upload
- Multer

### Environment
- dotenv

---

# 📁 Project Structure

```
SpotifyMusic
│
├── src
│   ├── controllers
│   ├── db
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   └── app.js
│
├── Server.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
├── README.md
└── docs
```

---

# 🏗 System Architecture

```
                Client (Postman)

                       │

                       ▼

              Express Server

                       │

                       ▼

                 Express Router

                       │

        ┌──────────────┴──────────────┐

        ▼                             ▼

 Authentication Middleware      Upload Middleware

        │                             │

        └──────────────┬──────────────┘

                       ▼

                  Controllers

                       ▼

                Business Logic

                       ▼

              MongoDB Database
```

---

# 🗄 Database Design (ER Diagram)

```
                    USER

+--------------------------------------+

| _id                                  |

| username                             |

| email                                |

| password                             |

| role                                 |

+--------------------------------------+

               │

               │ One Artist uploads many Songs

               ▼

                    MUSIC

+--------------------------------------+

| _id                                  |

| title                                |

| artist (User ID)                     |

| album (Album ID)                     |

| audio                                |

| image                                |

+--------------------------------------+

               │

               │ Many Songs belong to one Album

               ▼

                    ALBUM

+--------------------------------------+

| _id                                  |

| title                                |

| artist (User ID)                     |

| image                                |

| songs[]                              |

+--------------------------------------+
```

---

# 🔄 Authentication Flow

```
User

 │

 ▼

Register

 │

 ▼

Password Hashing (bcrypt)

 │

 ▼

MongoDB

 │

 ▼

Login

 │

 ▼

Verify Password

 │

 ▼

Generate JWT

 │

 ▼

Store JWT in Cookie

 │

 ▼

Access Protected Routes
```

---

# 🔄 Music Upload Flow

```
Artist

 │

 ▼

POST /api/music/upload

 │

 ▼

Authentication Middleware

 │

 ▼

Verify JWT

 │

 ▼

Multer Upload

 │

 ▼

Music Controller

 │

 ▼

Save Music Details

 │

 ▼

MongoDB

 │

 ▼

Success Response
```

---

# 📡 REST API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/auth/register | Register User |
| POST | /api/auth/login | Login User |
| POST | /api/auth/logout | Logout User |

---

## Music

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/music/upload | Upload Music |
| GET | /api/music | Get All Music |
| GET | /api/music/:id | Get Music By ID |

---

## Albums

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | /api/music/albums | Create Album |
| GET | /api/music/albums | Get All Albums |
| GET | /api/music/albums/:id | Get Album By ID |

---

# 🔐 Environment Variables

Create a `.env` file in the root directory.

```env
PORT=3000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

IMAGEKIT_PUBLIC_KEY=your_public_key

IMAGEKIT_PRIVATE_KEY=your_private_key

IMAGEKIT_URL_ENDPOINT=your_url_endpoint
```

---

# ⚙ Installation

Clone the repository

```bash
git clone https://github.com/YourUsername/spotify-backend.git
```

Move into the project folder

```bash
cd spotify-backend
```

Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

---

# 🧪 API Testing

The APIs were tested using **Postman**.

Tested APIs include:

- Register User
- Login User
- Logout User
- Upload Music
- Create Album
- Get All Music
- Get Music By ID
- Get All Albums
- Get Album By ID

---

# 🚀 Future Enhancements

- Playlist Management
- Search Songs
- Like Songs
- Favorite Songs
- Recently Played
- Music Streaming
- Pagination
- Swagger API Documentation
- Unit Testing
- Docker Support
- Deployment on Render or Railway

---

# 📚 Key Concepts Used

- RESTful API Development
- JWT Authentication
- Role-Based Authorization
- Middleware
- File Upload using Multer
- Password Hashing with bcrypt
- MongoDB Relationships
- Mongoose Models
- Cookie Authentication
- Environment Variables
- MVC Architecture

---

# 👩‍💻 Author

**Leena**

Backend Developer

### Skills

- Node.js
- Express.js
- MongoDB
- JavaScript
- REST APIs
- JWT Authentication
- Mongoose
- Git & GitHub

---

# ⭐ If you like this project, don't forget to give it a Star!