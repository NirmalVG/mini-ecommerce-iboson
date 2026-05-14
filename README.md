# Mini E-Commerce App (Machine Test)

A lightweight MERN-stack e-commerce application built for a full-stack developer machine test.

## 🛠 Tech Stack

- **Frontend:** React.js (Vite)
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose)
- **Auth:** JWT & bcryptjs

## 🚀 Quick Start

### 1. Install Dependencies

```bash
# Install backend
cd backend && npm install

# Install frontend
cd ../frontend && npm install
```

### 2. Environment Variables

Create a `.env` file inside the `/backend` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
JWT_SECRET=your_secret_key
PORT=3000
```

### 3. Run the Servers

You'll need two terminal windows:

- **Backend:** `cd backend && npm run dev` (runs on port 3000)
- **Frontend:** `cd frontend && npm run dev` (usually opens on http://localhost:5173)

## ✨ Features Implemented

- **Authentication:** User login & registration using JWT.
- **Products:** Public product grid with basic search/filtering. Admin endpoints for product CRUD operations.
- **Orders & Cart:** Local cart management, checkout process, and order history.
- **Security & UI:** Protected routes, basic HTTP interceptors, responsive UI, and standard error handling.
