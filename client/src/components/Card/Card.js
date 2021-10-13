import React from "react";
import { Link } from "react-router-dom";
import { Img } from "react-image";

//Loading fallback components
import LoadingImg from "../Loading/LoadingImg";
import BrokenImg from "../Loading/brokenImg";
import fallbackPng from "./pokeball.gif"

//Stylesheets
import Button from "../Styles/typeButtons.module.css";
import Style from "./Card.module.css"
import Container from "../Styles/Container.module.css"

export default function Card({name, id, img, types}){
    
    return (
        <div className={Container.Card}>
            <span className={Style.span}>{id}</span>

            {/*Link to Detail component. id <-- params*/}
            <Link to={`/pokemons/${id}`}>
                    <div className={Container.imgContainer}>
                        <Img id={`pokemonsImg${id}`} className={Style.img} 
                            src={img} loader={<LoadingImg/>} unloader={<BrokenImg/>}
                            alt={name} />
                        {/* <img id={`pokemonsImg${id}`} className={Style.img} 
                            src={img || fallbackPng} 
                            alt={name} /> */}
                    </div>
            </Link>
            <h3>{name}</h3>
            
            <div>
                {/* Render pokemon type buttons from props.types
                    Dinamyc CSS with CSS modules based on each type */
                types && types.map(t=>{
                    return <button className={`${Button[t]} ${Button.buttonType}`} key={`button${t}`}  value={t}>{t}</button> 
                }).slice(0,2)}
            </div> 
        </div>
    )
}

