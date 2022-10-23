import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DataContext from "../context/DataContext";

const PostPage = () => {
  const { posts, deletePost } = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);
  return (
    <main className="PostPage">
      <article className="post">
        {post && (
          <>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Link to={`/edit/${post.id}`}><button>Edit Post</button></Link>
            <button onClick={() => deletePost(post.id)}>Delete Post</button>
          </>
        )}
        {!post && (
          <>
            <h2>Post Not Found</h2>
            <p>Well, That's disappointing</p>
            <p>
              <Link to="/">Visit Our Home Page</Link>
            </p>
          </>
        )}
      </article>
    </main>
  );
};

export default PostPage;
