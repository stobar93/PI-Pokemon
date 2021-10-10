import React, {useEffect} from "react";
import { useHistory } from "react-router-dom";
import {connect} from 'react-redux';
import Card from "../Card/Card";
import Loading from "../Loading/Loading";
import Filter from '../Pagination/Filter'
import Sort from '../Pagination/Sort'
import Style from "./Pokemons.module.css"
import Container from "../Styles/Container.module.css"
import { setLoading } from "../../actions";
import Pagination from "../Pagination/Pagination";

export function Pokemons({currentPokemons, loading, setLoading}){

    let history = useHistory();
    
    useEffect(()=>{
        if(currentPokemons.length === 0) history.push("/")
    }, [])

    return loading ? <Loading/> : (
                <>
                    <div className={Container.Bar}>
                    <Sort />
                    <Filter />
                    </div>
                    <div className={Container.Cards}>
                {  
                    currentPokemons && currentPokemons.map(p=>{
                        return <Card key={p.id} name={p.name} id={p.id} img={p.imgUrl} types={p.types} />
                    })
                }
                </div>
                <Pagination/>
                </>
                
    )
}

const mapStateToProps = (state)=>{
    return {
        currentPokemons: state.currentPokemons,
        loading: state.loading
    }
}

export default connect(mapStateToProps, {setLoading})(Pokemons);

