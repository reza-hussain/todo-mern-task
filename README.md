# 📝 MERN To-Do List Application

A simple and responsive To-Do List management application built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js).  
Users can register, log in, and manage their personal to-do lists and tasks easily.

## ✨ Features

- User Registration and Login with secure JWT Authentication
- Create, Read, Update, Delete (CRUD) for To-Do Lists
- CRUD operations for individual To-Do Items inside lists
- Responsive and user-friendly UI
- RESTful API design
- Error handling and input validations
- Deployment-ready

## 🚀 Tech Stack

**Frontend:**

- React.js
- Axios
- React Router DOM

**Backend:**

- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- bcryptjs
- jsonwebtoken

**Others:**

- CORS
- dotenv
- Git & GitHub

## 📁 Project Structure

todo-mern-task/
├── client/(Frontend - React)
├── server/(Backend - Node.js, Express)
├── README.md
└── .gitignore

## ⚙️ Getting Started Locally

### 1. Clone the Repository

git clone https://github.com/your-username/todo-mern-app.git
cd todo-mern-app

### 2. Setup Server (Backend)

cd server
npm install

### 2.1 Create a .env file inside the server folder:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

### 2.2 Run the backend server:

npm run dev

### 3. Setup Client (Frontend)

cd client
npm install
npm start

### 4. Deployment

cd client
npm run build
