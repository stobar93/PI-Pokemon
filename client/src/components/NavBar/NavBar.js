import React from 'react';
import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';

export function NavBar(){
    return (
        <div>
            <h1>Pokemon App - NavBar</h1>
            <ul>
                <Link to="/pokemons"><li>Pokemons</li></Link>
                <Link to="/pokemons/create"><li>Create</li></Link>
            </ul>
            <SearchBar />
        </div>
        
    )
}