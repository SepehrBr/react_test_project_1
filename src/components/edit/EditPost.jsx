import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from '../../context/DataContext'

const EditPost = () => {
  const {
    posts,
    editTitle,
    setEditTitle,
    editBody,
    setEditBody,
    editPosts,
  } = useContext(DataContext)
  const { id } = useParams();
  const post = posts.find((post) => post.id.toString() === id);


  useEffect(() => {
    if (post) {
      setEditTitle(post.title);
      setEditBody(post.body);
    }
  }, [post, setEditBody, setEditTitle]);
  return (
    <main className="NewPost">
      {editTitle && (
        <>
          <h2>Edit Post</h2>
          <form onSubmit={(e) => e.preventDefault()} className="newPostForm">
            <label htmlFor="titlE">Title:</label>
            <input
              type="text"
              name="title"
              id="titlE"
              placeholder="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              required
            />
            <label htmlFor="postBod">Description:</label>
            <textarea
              name="body"
              id="postBod"
              placeholder="Description"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              required
            ></textarea>
            <button
              type="submit"
              style={
                editTitle.length !== 0 && editBody.length !== 0
                  ? { backgroundColor: "green" }
                  : { backgroundColor: "red" }
              }
              onClick={() => editPosts(post.id)}
            >
              Edit
            </button>
          </form>
        </>
      )}
      {!editTitle && (
        <>
          <h2>Post Not Found</h2>
          <p>Well, That's disappointing</p>
          <p>
            <Link to="/">Visit Our Home Page</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
