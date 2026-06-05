# 💬 WebChat

A modern, full-stack real-time messaging application built on the **MERN** stack. It uses **React 19** and **React Router v7** for a fast, dynamic frontend, and **Express 5** with **Socket.io** for secure authentication and instant one-to-one messaging.

---

## 🚀 Key Features

*   **Real-Time Texting:** Instant, latency-free message delivery leveraging `Socket.io` WebSockets.
*   **Secure Authentication:** Secure signup and login with password hashing via `bcrypt`.
*   **Cookie-Based JWTs:** Tokens are stored securely in HTTP cookies on the client side to prevent XSS attacks.
*   **Message Persistence:** Complete chat history is saved to and retrieved from MongoDB.
*   **Modern Routing:** Powered by React Router v7 for clean single-page transitions and protected routes.

---

## 🛠️ Tech Stack

### Frontend
*   **React 19** (Concurrent rendering, updated hook performance)
*   **React Router v7** (SPA routing and route guards)
*   **Socket.io-client** (Persistent WebSocket connections)
*   **Axios** (HTTP requests for auth and message history)

### Backend
*   **Node.js & Express 5** (Runtime environment with native async error handling)
*   **MongoDB & Mongoose** (Database schemas for users and messages)
*   **Socket.io** (Server-side WebSocket architecture and room management)
*   **JSON Web Tokens (JWT) & Cookie Parser** (Secure session handling)

---

## 📁 Project Structure

```bash
WebChat/
├── client/                     # Frontend React Application
│   └── src/
│       ├── components/         # Reusable UI components
│       │   ├── auth/           # Login.jsx, Register.jsx
│       │   └── layout/         # ChatContainer.jsx, HomeScreen.jsx, Navbar.jsx, Sidebar.jsx
│       ├── lib/                # Client configurations (Socket.js)
│       └── pages/              # App views (Home.jsx)
│
└── server/                     # Backend Node.js Application
    ├── controllers/            # Business logic (auth, message, user)
    ├── models/                 # Mongoose schemas (user.model, message.model)
    ├── routes/                 # Express API route endpoints
    ├── middlewares/            # Auth route protections (JWT verification)
    ├── socket.js               # Socket.io connection setup
    └── index.js                # server entry point
```
## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/atharvapatill/WebChat.git
cd WebChat
```

## 2. Install Dependencies

### Backend
```bash
cd server
npm install
```

### Frontend
```bash
cd client
npm install
```

## 3. Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```env
PORT=8000
NODE_ENV=development

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

MONGODB_URI=your_mongodb_connection_string
DB_NAME=your_database_name
```

## 4. Start the Application

### Backend
```bash
cd server
node index.js
```
### Frontend
```bash
cd client
npm run dev
```
