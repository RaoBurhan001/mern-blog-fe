// src/pages/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import Spinner from '../components/common/Spinner';
import useAuth from '../hooks/useAuth';

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/posts/${id}`);
        const fetchedPost = res.data.data;

        // If this is a draft, only author or admin can view
        if (
          fetchedPost.status === 'draft' &&
          (!user || (user.id !== fetchedPost.author?._id && user.role !== 'admin'))
        ) {
          setError('Not authorized to view this draft post.');
          setLoading(false);
          setTimeout(() => navigate('/'), 2000);
          return;
        }

        setPost(fetchedPost);
      } catch (err) {
        setError(`${err}Post not found or not authorized`);
      }
      setLoading(false);
    };

    fetchPost();
    // eslint-disable-next-line
  }, [id, user]);

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!post) return null;

  // Format date as “Month Day, Year” (e.g. “June 1, 2025”)
  const formattedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString(
    undefined,
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return (
    <div className="bg-gray-50 min-h-screen py-8 px-4">
      {/* Centered white card */}
      <div className="card max-w-3xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-bold text-center mb-4 text-gray-800">
          {post.title}
        </h1>

        {/* Date */}
        <p className="text-center text-gray-600 mb-2">{formattedDate}</p>

        {/* Author */}
        <p className="text-center text-gray-600 mb-6">
          {post.author?.name || 'Unknown'}
        </p>

        {/* Content with forced wrapping */}
        <div
          className="text-gray-700 leading-relaxed mx-auto"
          style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
          }}
        >
          {post.content}
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
