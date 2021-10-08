import React, { useState, useEffect } from "react";
import {connect} from "react-redux";
import { capitalLetter, loadNewPokemons } from "../../Utils/Methods";
import axios from "axios";
import Style from "./Create.module.css"
import { changePage, updatePokemons} from "../../actions";

export function Create({types, changePage}){
    
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
        
        if(event.target.id === 'types'){
            setInfo({
                ...info,
                types: [...info.types, event.target.value.toLowerCase()]
            }) 
        } else{
            setInfo({
                ...info,
                [event.target.id]: event.target.value
            })
        }
        
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        
        await axios.post('http://localhost:3001/pokemons', info)
        
        
        
        
        // 
        // 
        

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

    }

    const loadImgUrl = async ()=>{
        let id = Math.floor(Math.random()*152)
        
        let randomImg =  await axios.get(`http://localhost:3001/pokemons/${id}`)
    
        setInfo({
            ...info,
            imgUrl: randomImg.data[0].imgUrl
        })
    }

    return (
        <div>
            <h1>Create Pokemon</h1>
            <img id="createImg" className={Style.img} src={info.imgUrl} alt="imgUrl"/>
            
                <label htmlFor="name">Name: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="name" value={info.name}/>
                <select onChange={(e)=>{handleChange(e)}} id="types" value={info.types}>
                {
                    types && types.map(t=>{
                        return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                    })
                }
                </select>
                {
                    info.types.map(t=>{
                        return <button type="button">{t}</button>
                    })
                }
                <label htmlFor="imgUrl">Img URL: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="imgUrl" value={info.imgUrl}/>
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
        queryPage: state.queryPage
    }
}

export default connect(mapStateToProps, {updatePokemons, changePage})(Create);