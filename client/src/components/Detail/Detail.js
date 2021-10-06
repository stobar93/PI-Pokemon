import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

export function Detail (props){
    
    let pokemonDetail = {}
    if(props.id){
        console.log('vino ID')
        pokemonDetail = props.pokemonsToRender.find(p=>{return p.id === Number(props.id)}) }
    else {
        console.log('NO vino ID')
        pokemonDetail = props.pokemonsToRender[0]}
    
    

    return pokemonDetail ? (
        <div>
            <Link to="/pokemons"><button>X Close</button></Link>
            <h1>{pokemonDetail.name}</h1>
            <img src={pokemonDetail.imgUrl} alt={pokemonDetail.name}/>
            <p>ID: {props.id}</p>
            {pokemonDetail.types.map(t=>{
                    return <button key={`button${t}`}  value={t}>{t}</button> 
                }).slice(0,2)}
            {
                Array.from(Object.keys(pokemonDetail.stats)).map(s=>{
                   return <p key={s}>{s}: {pokemonDetail.stats[s]}</p>
                })
            }
                    </div>
    ) : null
}

const mapStateToProps = (state)=>{
    return {
        pokemonsToRender: state.pokemonsToRender,
    }
}
        
export default connect(mapStateToProps)(Detail);