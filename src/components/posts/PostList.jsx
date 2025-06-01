// src/components/posts/PostList.js
import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts, isDashboard = false }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} isDashboard={isDashboard} />
      ))}
    </div>
  );
};

export default PostList;
