import React, { useState } from "react";
import {connect} from 'react-redux';
import {searchPokemon} from '../../actions/index';
import { useHistory } from "react-router-dom";
import Style from './SearchBar.module.css';
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
        document.getElementById('searchSubmit').disabled = true;
        
        try{
            if(name !== ''){
                
                let searchResult = await searchPokemon(name)
                if(searchResult.length === 0){
                    alert(`${name} not found`)
                    
                } else{
                    history.push(`/search`)
                }
                
            } else {
                alert('Please type a valid name')
            }  
        } catch(e){
            history.push(`/pokemons`)
            alert(`${name} not found`)   
        }
        setName('')
        document.getElementById('searchSubmit').disabled = false;
    }

    return (
            <form className={Style.form} autoComplete="off">
                <input className={Style.inputSearch} onChange={(e)=>handleChange(e)} value={name} type="search" id="searchInput" placeholder="Pokemon name..."/>
                
                <button className={Style.btn} type="submit" onClick={(e)=>{handleSubmit(e)}} id="searchSubmit">Search</button>
                
            </form>
    )  
}



export default connect(null, {searchPokemon})(SearchBar);