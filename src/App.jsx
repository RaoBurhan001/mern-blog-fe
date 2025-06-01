// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import PrivateRoute from './components/layouts/PrivateRoute';
import PublicRoute from './components/layouts/PublicRoute';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreatePost from './components/posts/CreatePost';
import EditPost from './components/posts/EditPost';
import PostDetail from './pages/PostDetail';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-start pt-8 pb-16 px-4">
          <div className="w-full max-w-3xl">
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Home />} />
              <Route element={<PublicRoute />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>

              {/* Protected routes for both author & admin */}
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/posts/:id" element={<PostDetail />} />
              </Route>

              {/* Author-only routes */}
              <Route element={<PrivateRoute roles={['author', 'admin']} />}>
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/edit-post/:id" element={<EditPost />} />
              </Route>

              {/* Fallback */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
