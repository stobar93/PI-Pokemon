import React, { Component } from "react";
import axios from "axios";

class SearchBar extends Component {
    constructor(props){
        super(props)
        this.state = {name: ''}
    }

    handleChange = (event)=>{
        let value = event.target.value
        value = value.match(/[a-z]/ig) ? value.match(/[a-z]/ig).join('') : ""
        this.setState({name: value})
    }

    handleSubmit = async (event)=>{
        event.preventDefault()
        let name = this.state.name;
        
        try{
            let pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            console.log(pokemon)
        } catch(e){
            alert('Pokemon not found')
            
        }
        this.setState({name: ''})
        ////////////////////////
        ////////////////////////
        // VAS POR AQUI
        // FALTA DESPACHAR LA INFO 
        // DEL POKEMON ENCONTRADO AL STORE
        ////////////////////////
        ////////////////////////


    }

    render(){
        return (
            <form onSubmit={(e)=>this.handleSubmit(e)}>
                <input onChange={(e)=>this.handleChange(e)} value={this.state.name} type="text" id="searchInput" placeholder="Pokemon name..."/>
                <button type="submit" id="searchSubmit">Search</button>
            </form>
        )
    }
} 

export default SearchBar;