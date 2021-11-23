import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";
import SideBar from "../SideBar/SideBar";
import Style from "./NavBar.module.css";
import { Route } from 'react-router-dom';
import Filter from '../Pagination/Filter'
export function NavBar() {
  return (
    <div className={Style.StickyBar}>
    <div className={Style.NavBar}>
      <Link to="/pokemons">
        <h1>Poke App</h1>
      </Link>
      
      
      
        <Link className={Style.HideNavBar} to="/pokemons">Pokemons</Link>
        <Link className={Style.HideNavBar} to="/pokemons/create">Create</Link>
        <div className={[Style.NavBar, Style.HideNavBar].join(" ")}>
        <SearchBar />
      </div>
      <SideBar />
    </div>
    <Route exact path="/pokemons" component={Filter} />
    </div>
  );
}
