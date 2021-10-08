import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
//Redux
import {connect} from 'react-redux';
//Import actions
import { getPokemons, getTypes, changePage } from "../../actions/index.js";

import FireIcon from './img/fire.js'
import WaterIcon from './img/water.js'
import LeafIcon from './img/leaf.js'
import Style from "./Landing.module.css"

export function Landing ({getPokemons, getTypes, changePage}){

    
//GET "/pokemons" from DB & API after componentDidMount
//Server response will be saved in global state
useEffect(()=>{
    getPokemons(40, 1)
       //Get Types on app start
    getTypes()

},[]);

useEffect(()=>{
    return ()=>{
        changePage(1)
    }
})

    return (
        <div className={Style.Container}>
            <div className={Style.Landing}>
            
            <h1>Pokemon App</h1>
        <p>Select your type</p>
        <div className={Style.buttons}>
            <FireIcon />
            <WaterIcon />
            <LeafIcon />            
        </div>
        <Link to="/pokemons"><button>Start!</button></Link>
        </div>
        </div>
        
    )
}

export default connect(null, {getPokemons, getTypes, changePage})(Landing)