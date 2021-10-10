import React from "react";
import {Img} from "react-image";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { capitalLetter } from "../../Utils/Methods";
import {changePage} from '../../actions/index';
import LoadingImg from "../Loading/LoadingImg";
import typeButtons from '../Styles/typeButtons.module.css';
import Container from '../Styles/Container.module.css'
import {img} from '../Card/Card.module.css'
import BrokenImg from "../Loading/brokenImg";

export function Detail (props){

    let pokemonDetail = {}
    if(props.id){
        pokemonDetail = props.currentPokemons.find(p=>{
            return p.id.toString() === props.id}) }
    else {
        pokemonDetail = props.search[0]
    }
    
    

    return pokemonDetail ? (
        <div>
            <Link to="/pokemons"><button>X Close</button></Link>
            <h1>{pokemonDetail.name}</h1>
            <div className={Container.imgDetail}>
            <Img className={img} src={pokemonDetail.imgUrl} unloader={<BrokenImg/>} loader={<LoadingImg/>} alt={pokemonDetail.name}/>
            </div>
            
            
            {pokemonDetail.types.map(t=>{
                    return <button className={[typeButtons[t], typeButtons.buttonType].join(' ')} key={`button${t}`}   value={t}>{t}</button> 
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
        currentPokemons: state.currentPokemons,
        search: state.search
    }
}
        
export default connect(mapStateToProps, {changePage})(Detail);