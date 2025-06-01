import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../api';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';

const EditPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/posts/${id}`);
        setPost(res.data.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch post or not authorized');
      }
      setLoading(false);
    };
    fetchPost();
  }, [id]);

  const handleSubmit = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      await api.put(`/posts/${id}`, formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    }
    setLoading(false);
  };

  if (loading) return <Spinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!post) return null;

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Edit Post</h2>
      {/* Pass `initialValues={post}` instead of `initialData` */}
      <PostForm
        initialValues={post}
        onSubmit={handleSubmit}
        buttonLabel="Update"
      />
    </div>
  );
};

export default EditPost;
