import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <main className="App">
      <Header />
      <div className="Container">
        <Home />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
