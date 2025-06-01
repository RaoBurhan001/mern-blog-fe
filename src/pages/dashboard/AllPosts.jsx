import React, { useEffect, useState } from 'react';
import api from '../../api';
import PostItem from '../../components/posts/PostItem';
import Spinner from '../../components/common/Spinner';

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await api.get('/posts');
      setPosts(res.data.posts || []);
    } catch {
      setPosts([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this post?')) return;
    try {
      await api.delete(`/posts/${id}`);
      setPosts(posts.filter(p => p._id !== id));
    } catch {
      alert('Failed to delete post.');
      console.error('Failed to delete post');
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      {loading ? <Spinner /> : (
        posts.length ? posts.map(post => (
          <PostItem key={post._id} post={post} onDelete={handleDelete} />
        )) : <div>No posts found.</div>
      )}
    </div>
  );
};

export default AllPosts;
