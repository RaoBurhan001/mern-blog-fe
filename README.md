# MERN Blog Frontend

This repository contains the **frontend** portion of the MERN Blog application, a full‐stack blogging platform built with React. It provides user registration/login, protected routes (Dashboard, Create/Edit posts), and integrates with the backend API for all CRUD operations.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Features](#features)
3. [Tech Stack](#tech-stack)
4. [Prerequisites](#prerequisites)
5. [Installation & Setup](#installation--setup)
6. [Environment Variables](#environment-variables)
7. [Available Scripts](#available-scripts)
8. [Folder Structure](#folder-structure)
9. [Running Locally](#running-locally)
10. [Contributing](#contributing)
11. [License](#license)

---

## Project Overview

The MERN Blog Frontend is a React application that connects to an Express/MongoDB backend. It allows users to:

* **Register** & **Login** (JWT authentication)
* View a **public list** of published blog posts
* **Protected Routes** for authors and admins to create, edit, or delete posts
* **Dashboard** that shows posts in a responsive grid (3 cards per row on desktop)
* **Post Detail** view that displays an individual post fully
* **Responsive Design** with a clean, card‐based UI

---

## Features

* **Authentication Flow**

  * User can register and login
  * JWT token stored in localStorage
  * Protected routes (Dashboard, Create/Edit posts)
  * Role‐based access (admin vs. author)

* **Post Management**

  * Create new posts (title, content, status)
  * Edit existing posts (pre-filled form)
  * Delete posts directly from the dashboard
  * Public view of published posts
  * Pagination (3 posts per page) and search functionality

* **Dashboard**

  * Displays posts in a responsive 3-column grid (desktop), 2-column (tablet), 1-column (mobile)
  * Each card shows title, author, excerpt, date, and action buttons (View, Edit, Delete)
  * “Create” button at top of Dashboard

* **Post Detail**

  * Displays post title, date, author, and full content in a centered white card on a light-gray background
  * Preserves line breaks and wraps long text properly

* **Form Validations**

  * Client-side checking for required fields (e.g., title, content, email, password)
  * Error messages displayed inline

* **Global Layout & Styles**

  * Light-gray `background: #f6f8fa` for entire app
  * White, rounded cards with shadow (`.card`) for forms, post cards, and post detail
  * Consistent typography and spacing from a single `index.css`

---

## Tech Stack

* **React** (v18+)
* **React Router** (v6) for client-side routing
* **Context API** (`AuthContext`) for authentication state
* **Custom Hooks**

  * `useAuth()` for login/register/logout, token management
  * `usePosts()` for fetching paginated/searchable post lists
* **Axios** for HTTP requests
* **Tailwind-like utility classes** (custom CSS in `index.css`)
* **Spinner** component for loading states
* **ProtectedRoute** component for guarding private routes

---

## Prerequisites

* **Node.js** (v14 or higher)
* **npm** or **yarn**
* A running **backend API** (Express/MongoDB) deployed or locally running

  * You will need its base URL (e.g., `http://localhost:5000` or a live endpoint)

---

## Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/<your-username>/mern-blog-frontend.git
   cd mern-blog-frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set Environment Variables**
   Create a `.env.local` file in the project root (see [Environment Variables](#environment-variables) below).

4. **Start the development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser** and navigate to `http://localhost:3000`

---

## Environment Variables

Create a file named `.env.local` in the project root and add:

```
REACT_APP_API_BASE_URL=<your_backend_api_url>
```

* `REACT_APP_API_BASE_URL`: The base URL for your backend (e.g., `http://localhost:5000` or a live domain).

**Example**:

```
REACT_APP_API_BASE_URL=https://mern-blog-backend.onrender.com
```

Any variable prefixed with `REACT_APP_` will be automatically loaded into `process.env` in the React app.

---

## Available Scripts

In the project directory, you can run:

### `npm start` or `yarn start`

Runs the app in development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload if you make edits.
Lint errors and warnings will appear in the console.

### `npm run build` or `yarn build`

Builds the app for production to the `build/` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

* The build is minified and filenames include content hashes.
* Your app is ready to be deployed.

### `npm test` or `yarn test`

Launches the test runner in interactive watch mode.
(Note: No tests are included by default; you can add Jest/RTL if desired.)

### `npm run eject` or `yarn eject`

**Note: this is a one-way operation.**
If you aren’t familiar with what ejecting does, avoid running this.
It exposes the internal build configuration so you can customize Babel, Webpack, etc.

---

## Folder Structure

```
mern-blog-frontend/
├── public/
│   └── index.html
├── src/
│   ├── api/                   # Axios instance & auth token utility
│   │   ├── index.js           # exports `api` (axios) and `setAuthToken`
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Spinner.jsx
│   │   │   └── (reusable form components, if any)
│   │   ├── posts/
│   │   │   ├── PostList.jsx    # Renders a .grid of PostCard
│   │   │   ├── PostCard.jsx    # Individual post card in Dashboard
│   │   │   ├── PostForm.jsx    # Create/Edit form (title, content, status)
│   │   │   └── (any other post-specific components)
│   │   └── layout/
│   │       ├── Navbar.jsx      # Top navigation
│   │       └── ProtectedRoute.jsx # HOC for guarding routes
│   │
│   ├── hooks/
│   │   ├── useAuth.js          # AuthContext consumer + helpers
│   │   ├── usePosts.js         # Fetch paginated/searchable posts
│   │   └── useUser.js          # (optional) fetch current user data
│   │
│   ├── pages/
│   │   ├── Home.jsx           # Public listing of blog posts
│   │   ├── PostDetail.jsx     # Full post view
│   │   ├── Dashboard.jsx      # Admin/Author dashboard
│   │   ├── CreatePost.jsx     # Create new post form
│   │   ├── EditPost.jsx       # Edit existing post form
│   │   ├── Register.jsx       # User registration
│   │   ├── Login.jsx          # User login
│   │   └── NotFound.jsx       # 404 fallback
│   │
│   ├── context/
│   │   └── AuthContext.js     # Provides user, loginUser, registerUser, logoutUser
│   │
│   ├── styles/
│   │   └── index.css          # Global CSS (utility classes, card, btn, grid, etc.)
│   │
│   ├── App.jsx                # Routes & layout
│   ├── index.js               # Entry point (renders <App />)
│   └── reportWebVitals.js
├── .env.local                 # Environment variables (not checked into Git)
├── .gitignore
├── package.json
└── README.md
```

---

## Running Locally

1. **Ensure your backend** is running and accessible (for example, at `http://localhost:5000`).
2. **Set environment variables** in `.env.local`:

   ```env
   REACT_APP_API_BASE_URL=http://localhost:5000
   ```
3. **Install & start**:

   ```bash
   npm install
   npm start
   ```
4. **Visit** `http://localhost:3000` in your browser.

---

## Contributing

1. Fork this repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes, commit, and push:

   ```bash
   git add .
   git commit -m "Add some feature"
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request describing your changes.

Please ensure all new code is tested, and that you document any additional environment variables or setup steps in this README.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
