import React from "react";
import { Link } from "react-router-dom";
import Style from "./Card.module.css";

export default function Card({name, id, img, types}){
    return (
        <div className={Style.Card}>
            <h3>{name}</h3>
            
                <Link to={`/pokemons/${id}`}>
                    <img id={`pokemonsImg${id}`} className={Style.img} src={img} alt={name}/>
                </Link>
            
            
            <ul className={Style.cardUl}>
                
                <li className={Style.cardLi}>ID: {id}</li>
                
                <li>Types:</li>
                <li>{types && types.map(t=>{
                    return <button key={`button${t}`}  value={t}>{t}</button> 
                }).slice(0,2)}</li>
            </ul>
        </div>
    )
}

