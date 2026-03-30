import React, { useContext, useEffect } from "react";
import "./dashboard.css";
import { NotebookPen } from "lucide-react";
import { PostContext } from "./PostProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import { useAuth } from "../context/authContext";
export default function Dashboard() {
  const { post, setPost } = useContext(PostContext);
  const {token}=useAuth()
  const navigate = useNavigate();
  
useEffect(()=>
{
  async function fetchMyPosts() {
  try {
    const response = await axios.get("https://blog-1-d8f0.onrender.com/api/blog/allblogbyid",  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

    console.log("FETCHED POSTS:", response.data);

    const data=response.data.posts || response.data;
    setPost(Array.isArray(data)?data:[])

  } catch (error) {
    console.error(error);
  }
}
if(token){
  fetchMyPosts()
}
}

  
  ,[token])

  const handleDelete=async(index,blogId,token)=>{
    try {
      const response= await axios.delete(`https://blog-1-d8f0.onrender.com/api/blog/${blogId}`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data)
     setPost((previousPost)=>previousPost.filter((_,i)=>i!==index))
    } catch (error) {
      console.log("Deleted Blog",error)
    }
  }

   function startEditing(blogId){
   navigate(`/app/writepost/${blogId}`)
   }


  return (
    <section className="dashboard-page">
      <div className="dashboard-card">
        {Array.isArray(post) && post.length > 0 ? (
          post.map((item, index) => 
           (
              <div className="dashboard-card-direction" key={item._id}>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/blogpage/${item.slug}`}
                >
                  <ul>
                    <h6>{item.author?.name}</h6>
                    <h6>Posted Date: {item.createdAt} </h6>
                    <li>
                      <strong>Title: </strong>
                      {item.title}
                    </li>
                    <li>
                      <strong>Description:</strong> <span className="dashboard-des">{item.description || item.content}</span>
                    </li>
                  </ul>
                </Link>
                <div className="dashboard-card-direction">
                  <button
                    className="edit-btn"
                    onClick={() =>startEditing(item._id)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(index,item._id,token)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )
          )
        ) : (
          <>
            <NotebookPen />
            <h4>No Articles You Posted Yet</h4>
          </>
        )}
      </div>
    </section>
  );
}
