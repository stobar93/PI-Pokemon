import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//Redux
import {connect} from 'react-redux';
//Import actions
import { getPokemons, getTypes, changePage, setLoading } from "../../actions/index.js";
import Loading from '../Loading/Loading'
import FireIcon from './img/fire.js'
import WaterIcon from './img/water.js'
import LeafIcon from './img/leaf.js'
import Style from "./Landing.module.css"
import Button from '../Styles/typeButtons.module.css'

export function Landing ({pokemons, getPokemons, getTypes, changePage, setLoading}){

//GET "/pokemons" from DB & API at componentDidMount
//Server response is saved in global state
useEffect(()=>{
    getPokemons(40, 1)
       //Get Types on app start
    getTypes()

},[getPokemons, getTypes]);

//ComponentWillUnmount
useEffect(()=>{
    return ()=>{
        setLoading(false)
        changePage(1)
        
    }
}, [])

    return pokemons.length===0 ? <div className={Style.Container}><Loading/></div> : (
        <div className={Style.Container}>
            <div className={Style.Landing}>
            <p>Welcome to</p>
                <h1 className={Style.H1}>Pokemon App</h1>
                
                <div className={Style.buttons}>
                    <FireIcon />
                    <WaterIcon />
                    <LeafIcon />            
                </div>
                <Link to="/pokemons"><button className={Button.Submit}>Start!</button></Link>
            </div>
        </div>
    )
}

const mapStateToProps =(state)=>{
    return {
        pokemons: state.pokemons
    }
}

export default connect(mapStateToProps, {getPokemons, getTypes, changePage, setLoading})(Landing)