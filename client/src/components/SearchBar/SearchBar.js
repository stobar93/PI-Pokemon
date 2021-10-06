import React, { useState } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import axios from "axios";
import {searchPokemon} from '../../actions/index';
import { useHistory } from "react-router-dom";

export const SearchBar = ({searchPokemon})=>{
    
    const [name, setName] = useState('');
    let history = useHistory();

    const handleChange = (event)=>{
        let value = event.target.value
        value = value.match(/[a-z]/ig) ? value.match(/[a-z]/ig).join('') : ""
        setName(value)
    }

    const handleSubmit = async (event)=> {
        event.preventDefault()
        
        
        try{
            let pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            searchPokemon(pokemon.data)
            
        } catch(e){
            alert('Pokemon not found')
            
        }
        setName('')
        history.push(`/pokemons/search/${name}`)
        ////////////////////////
        ////////////////////////
        // VAS POR AQUI
        // FALTA DESPACHAR LA INFO 
        // DEL POKEMON ENCONTRADO AL STORE
        ////////////////////////
        ////////////////////////


    }

    return (
        <form>
                <input onChange={(e)=>handleChange(e)} value={name} type="text" id="searchInput" placeholder="Pokemon name..."/>
                
                <button type="submit" onClick={(e)=>{handleSubmit(e)}} id="searchSubmit">Search</button>
            </form>
    )  
}



export default connect(null, {searchPokemon})(SearchBar);