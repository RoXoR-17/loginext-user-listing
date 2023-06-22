import React from "react";

import "./index.css";

function Layout({ children }) {
  return (
    <div className="page-wrapper">
      <header className="header-container">Header</header>
      <main className="main-container">{children}</main>
      <footer className="footer-container">Footer</footer>
    </div>
  );
}

export default Layout;
