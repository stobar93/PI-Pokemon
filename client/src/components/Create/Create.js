import React, { useState, useEffect, Component } from "react";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";

import { capitalLetter, loadNewPokemons } from "../../Utils/Methods";
import axios from "axios";
import Style from "./Create.module.css"
import Button from "../Styles/typeButtons.module.css"
import { changePage, postPokemon} from "../../actions";
import LoadingImg from "../Loading/LoadingImg.js";
import notAvailable from "../img/notAvailable.png"
export function Create({types, changePage, postPokemon}){
    
    let history = useHistory();
    const [info, setInfo] = useState({
        name: '',
        types: [],
        imgUrl: '',
        height: '',
        weight: '',
        hp: '',
        attack: '',
        defense: '',
        speed: ''
    })

    useEffect(()=>{
        loadImgUrl()
    }, [])

    
    
    const handleChange = (event)=>{
        //Validar que solo se ingresen letras
        //Form controlado
        let value = event.target.value;
        let id = event.target.id
        
        if(id === 'types' ){
            if(!info.types.includes(value.toLowerCase()) && info.types.length <2){
                setInfo({
                    ...info,
                    types: [...info.types, value.toLowerCase()]
                })
            } else if(info.types.length === 2){alert("Plase select up to 2 types")}
             
        } else{
            if(id === 'name'){
                value = value.match(/[a-z]/ig) ? value.match(/[a-z]/ig).join('') : ""
            } else if(id !== 'imgUrl'){
                value = value.match(/[0-9]/g) ? value.match(/[0-9]/g).join('') : ""
            }
            setInfo({
                ...info,
                [id]: value
            })
        }
        
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        postPokemon(info)

        //Pendiente validar que todos los campos esten completos
        //Poner la primera en mayuscula al nombre
        //Pendiente cambiar tipos en el boton close
        
         setInfo({
            name: '',
            types: [],
            imgUrl: '',
            height: '',
            weight: '',
            hp: '',
            attack: '',
            defense: '',
            speed: ''
        })
        history.push("/pokemons")
    }

    const loadImgUrl = async ()=>{
        let id = Math.floor(Math.random()*152)+1
        
        let randomImg =  await axios.get(`http://localhost:3001/pokemons/${id}`)
    
        setInfo({
            ...info,
            imgUrl: randomImg.data[0].imgUrl
        })
    }

    const isValidHttpUrl = (string)=>{
        let url;
        
        try {
          url = new URL(string);
        } catch (_) {
          return false;  
        }
      
        return url.protocol === "http:" || url.protocol === "https:";
      }
    
    return (
        <div>
            <h1>Create Pokemon</h1>
            {/* {info.imgUrl.length !== 0 ? <img id="createImg" className={Style.img} src={info.imgUrl} alt="imgUrl"/> : <Loading/>} */}
            <div className={Style.imgDiv}>
            {isValidHttpUrl(info.imgUrl) ? <img id="createImg" className={Style.img} src={info.imgUrl} alt="imgUrl"/> : <LoadingImg/>} 
            </div>
            
                <label htmlFor="name">Name: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="name" value={info.name}/>
                <label htmlFor="types">Types: </label>
                <select onChange={(e)=>{handleChange(e)}} id="types" value={info.types}>
                <option key={`optionDefault`} value="" ></option>   
                {
                    types && types.map(t=>{
                        return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                    })
                }
                </select>
                {
                    info.types.map(t=>{
                        return <div className={[Button[capitalLetter(t)], Button.Div].join(" ")}><span>{capitalLetter(t)}</span><button className={Button.closeButton}>X</button></div>
                    })
                }
                <label htmlFor="imgUrl">Img URL: </label>
                <input onChange={(e)=>{handleChange(e)}} type="url" id="imgUrl" value={info.imgUrl}/>
                <button form="null" onClick={(e)=>{loadImgUrl(e)}} id="refreshImg">Refresh</button>
                <label htmlFor="height">Height: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="height" value={info.height}/>
                <label htmlFor="weight">Weight: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="weight" value={info.weight}/>
                <label htmlFor="hp">HP: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="hp" value={info.hp}/>
                <label htmlFor="attack">Attack: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="attack" value={info.attack}/>
                <label htmlFor="defense">Defense: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="defense" value={info.defense}/>
                <label htmlFor="speed">Speed: </label>
                <input onChange={(e)=>{handleChange(e)}} type="number" id="speed" value={info.speed}/>
                <button form="null" onClick={(e)=>{handleSubmit(e)}} id="submit">Submit</button>
            
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        types: state.types,
    }
}

export default connect(mapStateToProps, { changePage, postPokemon})(Create);