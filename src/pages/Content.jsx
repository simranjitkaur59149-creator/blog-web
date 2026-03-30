import React, { useEffect, useState } from "react";
import { NotebookPen } from "lucide-react";
import "./content.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import logo from "../assets/logo.png";
export default function Content() {
  const { token, user } = useAuth();
  // 1. Initialize as an empty array instead of null
  const [blogs, setBlogs] = useState([]);
  const [page,setPage]=useState(1)
  const [totalPages,setTotalPages]=useState(1)

  useEffect(() => {
const fetchBlogs=async () => {
  try {
    
   const res= await axios
      .get(`https://blog-1-d8f0.onrender.com/api/blog/?pageNumber=${page}`)
     
        setBlogs(res?.data?.blog || []);
        setTotalPages(res?.data?.totalPages||1)
 
      
     
    } catch (error) {
      
      console.error(error);
      setBlogs([]);
  }
  
}
fetchBlogs()
  }, [page]);
const createdDate=(date)=>{
  return new Date(date).toLocaleDateString("en-IN",{
    day:"numeric",
    month:"short",
    year:"numeric"
  })

}
  return (
    <section className="content-page">
      <div className="home-content">
   
        <h2>Welcome {user?.name}</h2>
        <p>
          {" "}
          Start exploring our latest posts and discover something new today.
          Discover insightful articles, tutorials, and stories from passionate
          writers. Our blog is a place where ideas are shared, knowledge grows,
          and creativity thrives. Whether you're here to learn something new or
          simply explore interesting topics, you're in the right place. Stay
          curious, keep learning, and enjoy the journey.{" "}
        </p>
      </div>

      {/* 3. Check if the array is empty */}
      {blogs.length === 0 ? (
        <div className="card">
          <figure className="notes">
            <NotebookPen />
          </figure>
          <h4>No articles found</h4>
        </div>
      ) : (
        <div className="card-container">
          {/* 4. Map over the blogs array */}
          {blogs.map((item) => (
            <div className="blog-card" key={item._id || item.id}>
              <div style={{display: "flex", gap: "10px",justifyContent: "space-between",alignItems: "center"}}><h6>{item.author?.name}</h6><h6> {item.createdAt?createdDate(item.createdAt):""}</h6></div>
              <h2 className="blog-title">{item.title} </h2>
              <p className="blog-desc">{item.content || item.description}</p>
              <Link to={`/blogpage/${item.slug}`} className="read-btn">
                read more
              </Link>
            </div>
          ))}
        </div> 
        
      )} <div style={{ marginTop: "20px", textAlign: "center" }}>
  <button
    disabled={page === 1}
    onClick={() => setPage((prev) => prev - 1)}
  >
    Prev
  </button>

  <span style={{ margin: "0 10px" }}>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage((prev) => prev + 1)}
  >
    Next
  </button>
</div>
    </section>
  );
}
