import logo from "../assets/logo.png";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
export default function Navbar() {
  const navigate = useNavigate();
  const { logout, token } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <>
    
      <header>
        <nav>
            <figure>  <a className="navbar-brand" href="#"> <img className="logo" src={logo} alt="" /></a>
        
           
          </figure>{" "}

          
          <ul>
            <li>
              <Link to="/app/content">Home</Link>
            </li>
            {token && (
              <>
                <li>
                  <Link to="/app/writepost">Write</Link>
                </li>
                <li>
                  <Link to="/app/dashboard">Dashboard</Link>
                </li>
              </>
            )}{" "}
            {token && (
              <li>
                <button className="button" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            )}
            {!token && (
              <>
                <li>
                  <Link to="/login">
                    <button className="btn">Login</button>
                  </Link>
                </li>
                <li>
                  <Link to="/register">
                    <button className="btn">Signup</button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

