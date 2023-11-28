import { useEffect, useState } from "react";

const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
};

const buttonStyle = {
  margin: "5px",
};

const FetchAPI = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((resp) => resp.json())
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleCreatePost = () => {
    const newPost = { title: "New Post", body: "This is a new post." };

    const options = {
      method: "POST",
      body: JSON.stringify(newPost),
      headers: {
        "Content-type": "application/json",
      },
    };

    fetch("https://jsonplaceholder.typicode.com/posts", options)
      .then((resp) => resp.json())
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, response]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={containerStyle}>
      <h2>Old way with Fetch API</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
      <button style={buttonStyle} onClick={handleCreatePost}>Create new</button>
    </div>
  );
};

export default FetchAPI;
