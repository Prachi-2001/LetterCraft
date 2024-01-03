import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div style={{ minWidth: "100vw" }}>
      <nav class="navbar navbar-light fixed-top">
        <div class="container">
          <Link class="navbar-brand" to="/">
            <img
              src="./letter-craft logo.png"
              alt="Logo"
              width="150"
              height="24"
            />
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
