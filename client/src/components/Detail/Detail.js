import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { capitalLetter } from "../../Utils/Methods";
import {changePage} from '../../actions/index'

export function Detail (props){
    
    

    let pokemonDetail = {}
    if(props.id){
        pokemonDetail = props.pokemonsToRender.find(p=>{
            return p.id.toString() === props.id}) }
    else {
        pokemonDetail = props.search[0]
    }
    
    

    return pokemonDetail ? (
        <div>
            <Link to="/pokemons"><button>X Close</button></Link>
            <h1>{pokemonDetail.name}</h1>
            <img src={pokemonDetail.imgUrl} alt={pokemonDetail.name}/>
            
            {pokemonDetail.types.map(t=>{
                    return <button key={`button${t}`}  value={t}>{t}</button> 
                }).slice(0,2)}

                {
                Array.from(Object.keys(pokemonDetail)).filter(i=>{
                    return i !== 'name' && i !== 'imgUrl' && i !== 'stats' && i !== 'types'
                }).map(s=>{
                    
                   return <p key={s}>{capitalLetter(s)}: {pokemonDetail[s]}</p>
                })
                }

            {
                Array.from(Object.keys(pokemonDetail.stats)).filter(p=>{return p!=='Special-attack' && p!=='Special-defense'}).map(s=>{
                   return <p key={s}>{s}: {pokemonDetail.stats[s]}</p>
                })
            }
                    </div>
    ) : null
}

const mapStateToProps = (state)=>{
    return {
        pokemonsToRender: state.pokemonsToRender,
        search: state.search
    }
}
        
export default connect(mapStateToProps, {changePage})(Detail);