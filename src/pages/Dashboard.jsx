// src/pages/Dashboard.js
import React, { useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import api from '../api';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/posts');
        setPosts(res.data.data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    if (user) fetchPosts();
    else setLoading(false);
  }, [user]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post._id !== id));
    } catch (err) {
      alert('Failed to delete post.')
      console.error('Failed to delete post:', err);
    }
  };

  return (
    <div>


      {/* --- Create Button --- */}
      <div style={{ textAlign: 'center', margin: '2rem 0' }}>
        <Link to="/create-post" className="btn">
          Create
        </Link>
      </div>

      {/* --- Loading / No Posts Messages --- */}
      {loading && (
        <div className="text-center" style={{ fontSize: '1.25rem', color: '#6b7280' }}>
          Loading posts...
        </div>
      )}
      {!loading && posts.length === 0 && (
        <div className="text-center" style={{ fontSize: '1.25rem', color: '#6b7280' }}>
          No posts found.
        </div>
      )}

      {/* --- Grid of Cards --- */}
      {!loading && posts.length > 0 && (
        <div className="grid" style={{ maxWidth: '1200px', margin: '0 auto', gap: '1.5rem' }}>
          {posts.map((post) => (
            <div key={post._id} className="card" style={{ padding: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem' }}>
                {post.title}
              </h2>
              <p style={{ color: '#374151', marginBottom: '1rem' }}>
                Author:{' '}
                <span style={{ fontWeight: '500', color: '#1d4ed8' }}>
                  {post.author?.name || 'Unknown'}
                </span>
              </p>
              <p style={{ marginBottom: '1rem', color: '#4b5563' }}>
                {post.content.substring(0, 100)}…
              </p>
              <p style={{ color: '#6b7280', marginBottom: '1rem', fontSize: '0.9rem' }}>
                Date: {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={`/posts/${post._id}`} className="btn" >
                  View
                </Link>
                <Link to={`/edit-post/${post._id}`} className="btn" >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(post._id)}
                  className="btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
