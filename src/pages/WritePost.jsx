import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./writepost.css";
import { PostContext } from "./PostProvider.jsx";
import { useAuth } from "../context/authContext";
import axios from "axios"
import { useParams } from "react-router-dom";

export default function WritePost() {
  const {id}=useParams()
  const { token } = useAuth();
  const {post,setPost, addPost } =useContext(PostContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // this useEffect helps to fill the form of writePost when we click on edit button
  useEffect(() => {
    if (id&& Array.isArray(post)&& post.length > 0) {
      const existingPost=post.find((blog)=>blog&&blog._id===id)
      setTitle(existingPost.title);
      setDescription(existingPost.description||existingPost.content);
    }
  }, [post, id]); //it will run every time when editing indexing changes
  const error = () => {
    if (!title || !description) {
      toast("Enter the both Title and Description");
    }
  };

  const cancel = () => {
    setTitle("");
    setDescription("");
  };

  const handlePost = async () => {
    if (title.length === 0 || description.length === 0) return error();
    try {
      const isEditing=Boolean(id)
      const url=isEditing?`https://blog-1-d8f0.onrender.com/api/blog/${id}`:`https://blog-1-d8f0.onrender.com/api/blog`
      const method=isEditing?"put":"post"
      const res = await axios(
       {method:method,
        url:url,

        data:{
          title,
          content: description,
        },
        
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if(isEditing)
      {
          setPost((prev)=>{
     prev.map((item)=>(item.id===id?res.data.updateBlog:item))
        })
             toast("Blog Updated Successfully"); 
      }
      else{

        addPost(res.data.newBlog);
        toast("Blog Posted Successfully");
      }
      setTitle("");
      setDescription("");
    } catch (error) {
      console.log(error)
      toast(id?"Failed to update blog":"Failed to create blog")
    }

    if (title.length === 0 || description.length === 0) return error();

   
  };
  return (
    <div className="post-card">
      <ToastContainer />
      <div>
        {" "}
        <label htmlFor="title">Title</label>
        <input
          className="title"
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        {" "}
        <label htmlFor="content">Write Your ideas</label>
        <textarea
          className="description"
          name="content"
          id="content"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="post-btns">
        {" "}
        <button onClick={handlePost} className="post-btn">
          Post
        </button>{" "}
        <button onClick={cancel} className="cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
}
