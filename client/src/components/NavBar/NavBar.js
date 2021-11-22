import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import Style from "./NavBar.module.css";

export function NavBar() {
  return (
    <div className={Style.NavBar}>
      <Link to="/pokemons">
        <h1>Pokemon App</h1>
      </Link>
      <Link to="/pokemons">Pokemons</Link>
      <Link to="/pokemons/create">Create</Link>
      <SearchBar />
    </div>
  );
}
