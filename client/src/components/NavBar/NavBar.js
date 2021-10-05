import React from 'react';
import {Link, Route} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Style from './NavBar.module.css'

export function NavBar(){
    return (
        <div className={Style.NavBar}>
            <h1>Pokemon App</h1>
            <Link to="/pokemons">Pokemons</Link>
            <Link to="/pokemons/create">Create</Link>
            <Route exact path="/pokemons"><Link to="/pokemons/search">Search</Link></Route> 
            <Route exact path="/pokemons/search" component={SearchBar} />
        </div>
        
    )
}