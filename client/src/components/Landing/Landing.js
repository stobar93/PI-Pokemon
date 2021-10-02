import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

//Redux
import {connect} from 'react-redux';
//Import actions
import { getPokemons, changePage } from "../../actions/index.js";

import FireIcon from './img/fire.js'
import WaterIcon from './img/water.js'
import LeafIcon from './img/leaf.js'


import Style from "./Landing.module.css"
import { loadInfo } from "../../Utils/Methods.js";
export function Landing ({getPokemons, changePage}){

    
//GET "/pokemons" from DB & API after componentDidMount
//Server response will be saved in global state
useEffect(()=>{
    (async ()=>{
       await loadInfo(getPokemons)
       await changePage(1,10)
    })()

    
},[getPokemons]);

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

export default connect(null, {getPokemons, changePage})(Landing)