import React from "react";
import { Link } from "react-router-dom";
import Style from "./Card.module.css";

export default function Card({name, id, img, types}){
    return (
        <div className={Style.Card}>
            
            <span className={Style.span}>{id}</span>
                <Link to={`/pokemons/${id}`}>
                    <img id={`pokemonsImg${id}`} className={Style.img} src={img} alt={name}/>
                </Link>
                <h3>{name}</h3>
            
                <div>{types && types.map(t=>{
                    return <button className={`${Style[t]} ${Style.buttonType}`} key={`button${t}`}  value={t}>{t}</button> 
                }).slice(0,2)}</div>
                
            
        </div>
    )
}

