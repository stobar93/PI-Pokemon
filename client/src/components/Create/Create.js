import React, { useState } from "react";
import {connect} from "react-redux";
import { capitalLetter } from "../../Utils/Methods";
import axios from "axios";

export function Create({types}){
    
    const [info, setInfo] = useState({
        name: '',
        types: [],
        imgUrl: '',
        height: '',
        weight: '',
        hp: '',
        attack: '',
        defense: '',
        speed: ''
    })
    
    const handleChange = (event)=>{
        //Validar que solo se ingresen letras
        //Form controlado
        
        if(event.target.id === 'types'){
            setInfo({
                ...info,
                types: [...info.types, event.target.value.toLowerCase()]
            }) 
        } else{
            setInfo({
                ...info,
                [event.target.id]: event.target.value
            })
        }
        
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        console.log(event)
        
        await axios.post('http://localhost:3001/pokemons', info) 
    }

    return (
        <div>
            <h1>Create Pokemon</h1>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <label htmlFor="name">Name: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="name"/>
                <select onChange={(e)=>{handleChange(e)}} id="types">
                {
                    types && types.map(t=>{
                        return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                    })
                }
                </select>
                {
                    info.types.map(t=>{
                        return <button type="button">{t}</button>
                    })
                }
                <label htmlFor="imgUrl">Img URL: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="imgUrl"/>
                <label htmlFor="height">Height: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="height"/>
                <label htmlFor="weight">Weight: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="weight"/>
                <label htmlFor="hp">HP: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="hp"/>
                <label htmlFor="attack">Attack: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="attack"/>
                <label htmlFor="defense">Defense: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="defense"/>
                <label htmlFor="speed">Speed: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="speed"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        types: state.types
    }
}

export default connect(mapStateToProps)(Create);