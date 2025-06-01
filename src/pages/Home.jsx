// src/pages/Home.js
import React, { useState } from 'react';
import usePosts from '../hooks/usePosts';
import PostList from '../components/posts/PostList';

function Home() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const { posts, loading, error, meta } = usePosts({
    page,
    limit: 10,
    search: searchQuery
  });

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // reset to page 1 when searching
    setSearchQuery(e.target.elements.search.value);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Blog Posts</h1>
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          name="search"
          placeholder="Search posts..."
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Search
        </button>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-500">{error}</div>}

      {!loading && !error && (
        <>
          <PostList posts={posts} />
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 mx-1 border rounded"
            >
              Prev
            </button>
            <span className="px-3 py-1 mx-1">
              Page {meta.page} of {meta.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => (p < meta.totalPages ? p + 1 : p))}
              disabled={page === meta.totalPages}
              className="px-3 py-1 mx-1 border rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
