import { createContext, useState } from "react";

export const PostContext = createContext();

export default function PostProvider({ children }) {
  const [post, setPost] = useState([]); //data is stored in array

  //
  async function addPost(newPost) {
    setPost((prev) => [...prev, newPost]);
  }

  return (
    //  using addPost we adding the new blog and using post we display the blogs both previous and new
    <PostContext.Provider value={{ addPost, post, setPost }}>
      {children}
    </PostContext.Provider>
  );
}
