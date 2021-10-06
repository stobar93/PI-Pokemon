import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import axios from "axios";
import {searchPokemon} from '../../actions/index';


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

    handleSubmit = async (event)=> {
        event.preventDefault()
        let name = this.state.name;
        console.log(this)
        try{
            let pokemon = await axios.get(`http://localhost:3001/pokemons?name=${name}`)
            this.props.searchPokemon(pokemon.data)
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
                <Link to={`/pokemons/search/${this.state.name}`}><button type="submit" id="searchSubmit">Search</button></Link>
            </form>
        )
    }
} 


export default connect(null, {searchPokemon})(SearchBar);