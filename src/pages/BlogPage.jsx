import { useEffect, useState } from "react";
import "./blog.css";
import { Heart } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function BlogPage() {
  const navigate = useNavigate();
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [likes, setLikes] = useState([]);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    fetchPostBySlug();
  }, []);

  async function fetchPostBySlug() {
    try {
      const res = await axios.get(
        `https://blog-web-backend-5bci.onrender.com/api/blog/${slug}`
      );

      const data = res.data;
      setPost(data);

      const likesArray = data.likes || [];
      setLikes(likesArray);

      // ✅ get user from localStorage (adjust if needed)
      const user = JSON.parse(localStorage.getItem("user"));
      const userId = user?._id;

      const liked = likesArray.some(
        (id) => id.toString() === userId
      );

      setIsLiked(liked);
    } catch (error) {
      console.error(error);
    }
  }

  const handleLikes = async () => {
    try {
      const res = await axios.post(
        `https://blog-web-backend-5bci.onrender.com/api/blog/${post._id}/like`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setLikes(res.data.likes);
      setIsLiked(res.data.message === "liked");
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) {
    return <h3>Loading...</h3>;
  }

  const createdDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="blog-page">
      <div className="blog-card">
        <h1>{post.title}</h1>

        <h6 style={{ margin: "60px auto" }}>
          {post.description || post.content}
        </h6>

        <div
          style={{
            width: "90%",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr ",
            alignItems: "center",
          }}
        >
        <div style={{ marginTop: "20px" }}>
          <Heart
            className={isLiked ? "liked" : ""}
            onClick={handleLikes}
            style={{ cursor: "pointer" }}
          />
          <span style={{ marginLeft: "8px" }}>
            {likes.length}
          </span>
        </div>
          <h6>{post.author?.name}</h6>

          <div>
            <button onClick={() => navigate(-1)}>
              Back
            </button>
          </div>

          <h6>
            {post.createdAt ? createdDate(post.createdAt) : ""}
          </h6>
        </div>

    
      </div>
    </main>
  );
}