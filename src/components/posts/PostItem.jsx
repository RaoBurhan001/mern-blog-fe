import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const PostItem = ({ post, onDelete }) => (
  <div className="border rounded p-4 mb-4 bg-white">
    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
    <div className="text-gray-700 mb-2">{post.content?.slice(0, 120)}...</div>
    <div className="text-sm text-gray-500 mb-2">Status: {post.status}</div>
    <div className="flex gap-2">
      <Link to={`/edit-post/${post._id}`}><Button>Edit</Button></Link>
      <Button className="bg-red-600 hover:bg-red-700" onClick={() => onDelete(post._id)}>Delete</Button>
    </div>
  </div>
);

export default PostItem;
