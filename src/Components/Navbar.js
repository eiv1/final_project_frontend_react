import { useRef, useState } from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";

export default function Navbar() {

  const [userID,setUserID]=useState(window.localStorage.id)

  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        shvarim
      </Link>
      <ul>
        {typeof userID == "undefined" ? (
          <CustomLink to="/login">Login</CustomLink>
        ) : (
        <>
          <CustomLink to="/logout">Logout</CustomLink>
          <CustomLink to="/game">Game</CustomLink>
          </>
        )}
        <CustomLink to="/about">About</CustomLink>
      </ul>
    </nav>
  );
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
