import React, { useState } from "react";
import {connect} from "react-redux";
import { capitalLetter } from "../../Utils/Methods";

export function Create({types}){
    
    const [info, setInfo] = useState({
        name: '',
        types: [],
        height: '',
        weight: '',
        hp: '',
        attack: '',
        defense: '',
        speed: ''
    })
    
    const handleChangeText = ()=>{
        //Validar que solo se ingresen letras
        //Form controlado
        
    }


    return (
        <div>
            <h1>Create Pokemon</h1>
            <form>
                <label for="name">Name: </label>
                <input type="text" id="name"/>
                <select id="types">
                {
                    types && types.map(t=>{
                        return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                    })
                }
                </select>
                <label for="imgUrl">Img URL: </label>
                <input type="text" id="imgUrl"/>
                <label for="height">Height: </label>
                <input type="text" id="height"/>
                <label for="weight">Weight: </label>
                <input type="text" id="weight"/>
                <label for="hp">HP: </label>
                <input type="text" id="hp"/>
                <label for="attack">Attack: </label>
                <input type="text" id="attack"/>
                <label for="defense">Defense: </label>
                <input type="text" id="defense"/>
                <label for="speed">Speed: </label>
                <input type="text" id="speed"/>
                
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