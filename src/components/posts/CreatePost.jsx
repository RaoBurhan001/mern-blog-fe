// src/pages/CreatePost.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import api from '../../api/index.js';

function CreatePost() {
  const navigate = useNavigate();

  const handleCreate = async (formData) => {
    try {
        console.log('Creating post with data:', formData);
      await api.post('/posts', formData);
      navigate('/dashboard');
    } catch (err) {
        console.log(err);
      console.error(err.response?.data?.error || 'Error creating post');
      // You could show a toast or inline error here
    }
  };

  return (
    <div>
      {/* We can reuse the nav from Dashboard or have a similar header here */}
      <PostForm onSubmit={handleCreate} buttonLabel="Create" />
    </div>
  );
}

export default CreatePost;
