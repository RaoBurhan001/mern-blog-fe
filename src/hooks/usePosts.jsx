// src/hooks/usePosts.js
import { useState, useEffect } from 'react';
import api from '../api';

const usePosts = ({ page = 1, limit = 10, search = '' } = {}) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [meta, setMeta] = useState({ page, totalPages: 1 });

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const res = await api.get('/posts/public', {
          params: { page, limit, search }
        });
        setPosts(res.data.data);
        setMeta({
          page: res.data.page,
          totalPages: res.data.totalPages
        });
        setError(null);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching posts');
      }
      setLoading(false);
    };
    fetchPosts();
  }, [page, limit, search]);

  return { posts, loading, error, meta };
};

export default usePosts;
