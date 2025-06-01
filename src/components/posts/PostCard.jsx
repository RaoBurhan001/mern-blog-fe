// src/components/posts/PostCard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api';

const PostCard = ({ post, isDashboard = false }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await api.delete(`/posts/${post._id}`);
        window.location.reload();
      } catch (err) {
        console.error(err.response?.data?.error || 'Error deleting post');
      }
    }
  };

  return (
    <div className="card h-100 shadow-sm" style={{ minHeight: 320, overflow: 'hidden' }}>
      <div className="card-body d-flex flex-column">
        <h3 className="card-title h5 fw-bold mb-2">{post.title}</h3>
        <p className="card-subtitle mb-2 text-muted" style={{ fontSize: '0.95rem' }}>
          By {post.author.name} on {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}
        </p>
        <p className="card-text text-truncate mb-3" style={{ maxWidth: '100%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
        {post.content.substring(0, 300)}…
        </p>
        {isDashboard ? (
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <button
              onClick={() => navigate(`/edit-post/${post._id}`)}
              className="btn btn-warning btn-sm"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
            <Link
              to={`/posts/${post._id}`}
              className="btn btn-primary btn-sm"
            >
              View
            </Link>
          </div>
        ) : (
          <div className="mt-auto">
            <Link
              to={`/posts/${post._id}`}
              className="btn btn-link text-primary p-0"
            >
              Read more
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
