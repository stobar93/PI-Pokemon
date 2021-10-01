import React from "react";

export default function Card({name, id, img, types}){
    return (
        <div>
            <h3>{name}</h3>
            <img src={img} alt={name}/>
            <ul>
                <li>ID: {id}</li>
                <li>Types: {types}</li>
            </ul>
        </div>
    )
}