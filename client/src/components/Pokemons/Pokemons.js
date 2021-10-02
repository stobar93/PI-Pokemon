import React from "react";
import {connect} from 'react-redux';
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import Style from "./Pokemons.module.css"

import { getPokemons } from "../../actions/index.js";
import { loadInfo } from "../../Utils/Methods.js";

export function Pokemons({pokemons, pokemonsToRender, getPokemons}){

    
    
    return (
        <div className={Style.Container}>
            <h1>Pokemons</h1>

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
        pokemons: state.pokemon,
        pokemonsToRender: state.pokemonsToRender
    }
}

export default connect(mapStateToProps, {getPokemons})(Pokemons);

{/* <div className={Style.Bar}>
                <select onChange={()=>handleLimitChange()} id="limitInput">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="40">40</option>
                </select>
            
            <div className={Style.Pagination}>
                 {
                    pages && pages.map((p)=>{
                        return <button key={`button${p}`} onClick={e=>handlePaginationClick(e)} value={p}>{p}</button>
                    })
                }
            </div>
            </div>             */}