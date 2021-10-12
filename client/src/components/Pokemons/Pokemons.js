import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import Card from "../Card/Card";
import Loading from "../Loading/Loading";

import Style from "./Pokemons.module.css"
import Container from "../Styles/Container.module.css"
import { setLoading, searchPokemon } from "../../actions";


export function Pokemons({currentPokemons, loading, setLoading, isSearch, currentSearch, searchPokemon}){

    let history = useHistory();
    
    useEffect(()=>{
        if(currentPokemons.length === 0) history.push("/")
    }, [])

    const clearSearch = ()=>{
        searchPokemon()
        history.push("/pokemons")
    }

    return isSearch ? (
    
    <div className={Container.Cards}>
        {  
            currentSearch && currentSearch.map(p=>{
                return <Card key={p.id} name={p.name} id={p.id} img={p.imgUrl} types={p.types} />
            })  
        }
        <button onClick={()=>clearSearch()}>Clear search</button>
    </div>) : loading ? <Loading/> : (
                
                    
                    <div className={Container.Cards}>
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
        currentPokemons: state.currentPokemons,
        loading: state.loading,
        currentSearch: state.search
    }
}

export default connect(mapStateToProps, {setLoading, searchPokemon})(Pokemons);

