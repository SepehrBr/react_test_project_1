import React, { useContext } from "react";
import DataContext from "../context/DataContext";

const NewPost = () => {
  const {
    postTitle,
    setpostTitle,
    postBody,
    setpostBody,
    submitButton,
  } = useContext(DataContext)

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form onSubmit={submitButton} className='newPostForm'>
        <label htmlFor="title">Title:</label>
        <input type="text" name="title" id="title" placeholder="Title" value={postTitle} onChange={(e) => setpostTitle(e.target.value)} required/>
        <label htmlFor="postBody">Description:</label>
        <textarea
          name="body"
          id="postBody"
          placeholder="Description" value={postBody} onChange={(e) => setpostBody(e.target.value)} required
        ></textarea>
        <button type="submit" style={(postTitle.length !== 0 && postBody.length !== 0) ? {backgroundColor: "green"} : {backgroundColor: "red"} }>Submit</button>
      </form>
    </main>
  );
};

export default NewPost;
