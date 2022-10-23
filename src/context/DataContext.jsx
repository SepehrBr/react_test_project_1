import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import api from "../api/posts";

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigate();
  const [postTitle, setpostTitle] = useState("");
  const [postBody, setpostBody] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    );
    setSearchResults(filteredResults.reverse());
  }, [posts, search]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (err) {
        if (err.response) {
          console.log(err.response.data.message);
          console.log(err.response.status);
          console.log(err.response.headers);
        } else {
          console.log(`Error: ${err.meesage}`);
        }
      }
    };
    (async () => fetchPosts())();
  }, []);

  // functions
  const submitButton = async (e) => {
    e.preventDefault();
    const id = posts.length + 1;
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const newPost = {
      id,
      title: postTitle,
      datetime: datetime,
      body: postBody,
    };

    const response = await api.post("/posts", newPost);
    const postLists = [...posts, response.data];
    setPosts(postLists);
    setpostTitle("");
    setpostBody("");
    navigation("/");
  };
  const deletePost = async (id) => {
    await api.delete(`/posts/${id}`);
    const listPosts = posts.filter((post) => post.id !== id);
    setPosts(listPosts);
    navigation("/");
  };
  const editPosts = async (id) => {
    const datetime = format(new Date(), "MMMM dd, yyyy pp");
    const editedPost = {
      id,
      title: editTitle,
      datetime: datetime,
      body: editBody,
    };
    const response = await api.put(`/posts/${id}`, editedPost);
    setPosts(posts.map((post) => (post.id === id ? { ...response } : post)));
    setEditBody("");
    setEditTitle("");
    navigation("/");
  };
  return (
    <DataContext.Provider
      value={{
        /* Nav.jsx */ search, setSearch,
        /* Home.jsx */ searchResults,
        /* NewPost.jsx */ postTitle, setpostTitle, postBody, setpostBody, submitButton,
        /* EditPost.jsx */ posts, editTitle, setEditTitle, editBody, setEditBody, editPosts,
        /* PostPgae.jsx */ /* posts */ deletePost,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
