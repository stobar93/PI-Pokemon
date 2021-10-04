import React from "react";
import {connect} from 'react-redux';
import Card from "../Card/Card";
import Style from "./Pokemons.module.css"

import { getPokemons } from "../../actions/index.js";


export function Pokemons({pokemons, pokemonsToRender, getPokemons}){

    
    
    return (
        <div className={Style.Container}>
            <h1>Pokemons</h1>

            
                <div className={Style.CardContainer}>
                { 
                pokemonsToRender && pokemonsToRender.map(p=>{
                    return <Card key={p.id} name={p.name} id={p.id} img={p.imgUrl} types={p.types} />
                })
            }
                </div>
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        pokemons: state.pokemon,
        pokemonsToRender: state.pokemonsToRender
    }
}

export default connect(mapStateToProps, {getPokemons})(Pokemons);

