import React from "react";
import {connect} from 'react-redux';
import Card from "../Card/Card";
import Filter from '../Pagination/Filter'
import Sort from '../Pagination/Sort'
import Style from "./Pokemons.module.css"


export function Pokemons({currentPokemons}){

    return (
                <div className={Style.CardContainer}>
                    <Sort />
                    <Filter />
                { 
                    currentPokemons && currentPokemons.map(p=>{
                        return <Card key={p.id} name={p.name} id={p.id} img={p.imgUrl} types={p.types} />
                    })
                }
                </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        currentPokemons: state.currentPokemons
    }
}

export default connect(mapStateToProps)(Pokemons);

