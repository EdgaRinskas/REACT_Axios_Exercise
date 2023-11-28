import { useEffect, useState } from "react";
import { fetchPosts, createPost, deletePost, updatePost } from "./api/userV2";

const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
};

const buttonStyle = {
  margin: "5px",
};

const AxiosV2 = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((response) => {
        setPosts(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCreatePost = () => {
    const newPost = { title: "New Post", body: "This is a new post." };

    createPost(newPost)
      .then((response) => {
        setPosts((prevPosts) => [...prevPosts, response]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeletePost = (id) => {
    deletePost(id)
      .then(() => {
        setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleUpdatePost = (updatingPost) => {
    const updatedPost = { ...updatingPost, title: "Updated Post" };

    updatePost(updatedPost)
      .then((response) => {
        setPosts((prevPosts) =>
          prevPosts.map((post) => (post.id === response.id ? response : post))
        );
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div style={containerStyle}>
      <h2>Axios v2 way</h2>
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

export default AxiosV2;
