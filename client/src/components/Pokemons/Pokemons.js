import React from "react";
import {connect} from 'react-redux';
import Card from "../Card/Card";
import  Pagination  from "../Pagination/Pagination";
import Style from "./Pokemons.module.css"



export function Pokemons({pokemonsToRender}){

    
    
    return (
        <div className={Style.Container}>
            <Pagination />
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
        pokemonsToRender: state.pokemonsToRender
    }
}

export default connect(mapStateToProps)(Pokemons);

