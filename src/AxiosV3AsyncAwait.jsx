import { useEffect, useState } from "react";
import { fetchPosts, createPost, deletePost, updatePost } from "./api/userV2.js";


const containerStyle = {
  maxWidth: "600px",
  margin: "auto",
  padding: "20px",
};

const buttonStyle = {
  margin: "5px",
};

const AxiosV3AsyncAwait = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetchPosts();
        setPosts(response);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const handleCreatePost = async () => {
    const newPost = { title: "New Post", body: "This is a new post." };

    try {
      const response = await createPost(newPost);
      setPosts((prevPosts) => [...prevPosts, response]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      await deletePost(id);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePost = async (updatingPost) => {
    const updatedPost = { ...updatingPost, title: "Updated Post" };

    try {
      const response = await updatePost(updatedPost);
      setPosts((prevPosts) =>
        prevPosts.map((post) => (post.id === response.id ? response : post))
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Axios v2 way with Async/Await</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              {post.title}{" "}
              <button style={buttonStyle} onClick={() => handleDeletePost(post.id)}>Delete</button>
              <button style={buttonStyle} onClick={() => handleUpdatePost(post)}>Update title</button>
            </li>
          ))}
        </ul>
      )}
      <button style={buttonStyle} onClick={handleCreatePost}>Create new</button>
    </div>
  );
};

export default AxiosV3AsyncAwait;
