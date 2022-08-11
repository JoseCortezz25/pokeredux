import React from "react";
import Header from "../Header/Header";
import Home from "../Home/Home";
import Footer from "../Footer/Footer";
import PokemonDetails from "../PokemonDetails/PokemonDetails";
import { Routes, Route } from "react-router-dom";

import "./Layout.css";

const Layout = () => {
  return (
    <main className="App">
      <Header />
      <div className="Container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
          <Route path="/page/:page" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
