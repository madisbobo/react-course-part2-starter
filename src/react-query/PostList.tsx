import { useState } from "react";
import usePosts from "./hooks/usePosts";

const PostList = () => {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [userId, setUserId] = useState<number>();
  const {
    data: posts,
    error,
    isLoading,
  } = usePosts({ page, pageSize, userId });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      {/* <select
        className="form-select mb-3"
        value={userId}
        onChange={(e) => setUserId(parseInt(e.target.value))}
      >
        <option value="">Choose user</option>
        <option value="1">User 1</option>
        <option value="2">User 2</option>
        <option value="3">User 3</option>
      </select> */}
      
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item">
            {post.title}
          </li>
        ))}
      </ul>
      <button
        className="btn btn-primary my-3 me-1"
        disabled={page === 1}
        onClick={() => {
          if (page > 1) setPage(page - 1);
        }}
      >
        Previous
      </button>
      {page}
      <button
        className="btn btn-primary ms-1"
        onClick={() => setPage(page + 1)}
      >
        Next
      </button>
    </>
  );
};

export default PostList;
