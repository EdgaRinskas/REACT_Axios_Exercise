import { useEffect, useState } from "react";
import axios from "axios";

const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
};

const buttonStyle = {
  margin: "5px",
};

const Axios = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => setPosts(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleCreatePost = () => {
    const newPost = { title: "New Post", body: "This is a new post." };

    axios.post("https://jsonplaceholder.typicode.com/posts", newPost)
      .then((response) => setPosts((prevPosts) => [...prevPosts, response.data]))
      .catch((error) => console.error(error));
  };

  const handleDeletePost = (id) => {
    axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then(() => setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id)))
      .catch((error) => console.log(error));
  };

  const handleUpdatePost = (updatingPost) => {
    const updatedPost = { ...updatingPost, title: "Updated Post" };

    axios.put(`https://jsonplaceholder.typicode.com/posts/${updatingPost.id}`, updatedPost)
      .then((response) => setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === response.data.id ? response.data : post))
      ))
      .catch((error) => console.error(error));
  };

  return (
    <div style={containerStyle}>
      <h2>Axios way</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title}{" "}
            <button style={buttonStyle} onClick={() => handleDeletePost(post.id)}>Delete</button>
            <button style={buttonStyle} onClick={() => handleUpdatePost(post)}>Update title</button>
          </li>
        ))}
      </ul>
      <button style={buttonStyle} onClick={handleCreatePost}>Create new</button>
    </div>
  );
};

export default Axios;
