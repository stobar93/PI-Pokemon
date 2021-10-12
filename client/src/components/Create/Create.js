import React, { useState, useEffect} from "react";
import {connect} from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

//Redux actions
import { postPokemon, setLoading} from "../../actions";
import { capitalLetter, isValidHttpUrl } from "../../Utils/Methods";

//Stylesheets
import Style from "./Create.module.css";
import Button from "../Styles/typeButtons.module.css";
import Container from "../Styles/Container.module.css";
import {img} from '../Card/Card.module.css'
//Loading fallback components
import LoadingImg from "../Loading/LoadingImg.js";

export function Create({types, postPokemon, setLoading}){
    
    let history = useHistory();
    const [info, setInfo] = useState({
        name: '', types: [], imgUrl: '',
        height: '', weight: '', hp: '',
        attack: '', defense: '', speed: ''
    })

    //ComponentDidMount - Request random pokemon info to extract imgUrl
    useEffect(()=>{
        const imgLoad = new Promise((resolve, reject)=>{
            let id = Math.floor(Math.random()*152)+1;
            try{resolve(axios.get(`http://localhost:3001/pokemons/${id}`))}
            catch(e){reject(e)}
        })
        
        imgLoad.then(response => response.data)
        .then(data=>data[0].imgUrl)
        .then(imgUrl=>setInfo((i)=>{
            return {
                ...i,
                imgUrl: imgUrl
            }
        })).catch(e=>alert(e))
        
        // (async ()=>{
        //     let id = Math.floor(Math.random()*152)+1
        //     let randomImg =  await axios.get(`http://localhost:3001/pokemons/${id}`)

        //     setInfo((i)=>{return{
        //         ...i,
        //         imgUrl: randomImg.data[0].imgUrl
        //     }})
        // })()
         }, [])

    const loadImgUrl = async ()=>{
        let id = Math.floor(Math.random()*152)+1
        
        let randomImg =  await axios.get(`http://localhost:3001/pokemons/${id}`)
    
        setInfo({
            ...info,
            imgUrl: randomImg.data[0].imgUrl
        })
    }

    const handleChange = (event)=>{
        
        let value = event.target.value;
        let id = event.target.id
        
        if(id === 'types' ){ //Types input. Adds selected types, max. 2 types.
            if(!info.types.includes(value.toLowerCase()) && info.types.length <2){
                setInfo({
                    ...info,
                    types: [...info.types, value.toLowerCase()]
                })
            } else if(info.types.length === 2){alert("Plase select up to 2 types")}
             
        } else{
            if(id === 'name'){ //User can only type letters a-z case insensitive
                value = value.match(/[a-z]/ig) ? capitalLetter(value.match(/[a-z]/ig).join('')) : ""
                if(value && value.length > 20){
                    alert('Max 20 characters')
                    value = info.name
                }
            } else if(id !== 'imgUrl'){ 
                value = value.match(/\d/g) ? value.match(/\d/g).join('') : ""
            }
            setInfo({
                ...info,
                [id]: value
            })
        }
        
    }

    const handleClick = (event)=>{
        
        let value = event.target.value;
        
        
        //Types input. Adds selected types, max. 2 types.
            if(!info.types.includes(value.toLowerCase()) && info.types.length <2){
                setInfo({
                    ...info,
                    types: [...info.types, value.toLowerCase()]
                })
            }else if(info.types.includes(value.toLowerCase())){
                let filter = info.types.filter(t=>t!==value.toLowerCase())
                setInfo({
                    ...info,
                    types: [...filter]
                })
            } 
            else if(info.types.length === 2){alert("Plase select up to 2 types")}
         
        
    }

    const handleSubmit = async (event)=>{
        event.preventDefault()
        setLoading(true)
        postPokemon(info)

        //Pendiente validar que todos los campos esten completos
        //Poner la primera en mayuscula al nombre
        //Pendiente cambiar tipos en el boton close
        
         setInfo({
            name: '',   types: [],  imgUrl: '', height: '',
            weight: '', hp: '',     attack: '', defense: '',
            speed: ''
        })
        history.push("/pokemons") //After creating the new pokemon, returns to /pokemons
    }

    const quitType = (type)=>{ //Allows the user to change selected types
        setInfo({
            ...info,
            types: info.types.filter(t=>t!== type.toLowerCase())
        })
    }

    return (
        <div className={Container.Detail}>
            <h1 className={Style.Title}>Create Pokemon</h1>
            
            <div className={Container.imgDetail}>
                {isValidHttpUrl(info.imgUrl) ? <img id="createImg" className={img} src={info.imgUrl} alt="imgUrl"/> : <LoadingImg/>} 
            </div>
            
            <div className={Style.name}>
                <label htmlFor="name">Name: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="name" value={info.name}/>
            </div>

            <div class={[Style.types, Style.Dropdown].join(' ')}>
                <p>Select types &darr;</p>
                        

                    <div className={Style.DropdownContent}>
                        
                        {/* <select  onChange={(e)=>{handleChange(e)}} id="types" value={info.types}>
                            <option key={`optionDefault`} value="" ></option>   
                            {
                                types && types.map(t=>{
                                    return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                                })
                            }
                        </select> */}
                        
                    {
                        types && types.map(t=>{
                            return <option onClick={(e)=>{handleClick(e)}} className={[Button[capitalLetter(t.name)], Button.simple].join(' ')} key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                        })
                    }
                        
                </div> 
            </div> 
            <div className={Style.SelectedTypes}>
            {
                    info.types.map(t=>{
                        t = capitalLetter(t)
                        return <div key={`tag${t}`} className={[Button[t], Button.Div, Style.TypeTag].join(" ")}><span>{t}</span><button onClick={()=>quitType(t)} className={Button.closeButton}>X</button></div>
                    })
                }
            </div>
                
            
            <div className={Style.url}>    
                <label htmlFor="imgUrl">Img URL: </label>
                <input  onChange={(e)=>{handleChange(e)}} type="url" id="imgUrl" value={info.imgUrl}/>
                <button form="null" className={Button.Important} onClick={(e)=>{loadImgUrl(e)}} id="refreshImg">Refresh</button>
            </div>
            <div className={Style.height}>
                <label htmlFor="height">Height: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="height" value={info.height}/>
            </div>
            <div className={Style.weight}>
                <label htmlFor="weight">Weight: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="weight" value={info.weight}/>
            </div>
            <div className={Style.hp}>
                <label htmlFor="hp">HP: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="hp" value={info.hp}/>
            </div>
            <div className={Style.attack}>
                <label htmlFor="attack">Attack: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="attack" value={info.attack}/>
            </div>
            <div className={Style.defense}>
                <label htmlFor="defense">Defense: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="defense" value={info.defense}/>
            </div>
            <div className={Style.speed}>
                <label htmlFor="speed">Speed: </label>
                <input onChange={(e)=>{handleChange(e)}} type="text" id="speed" value={info.speed}/>
            </div>
            
                <button className={[Style.submitButton, Button.Submit].join(' ')} form="null" onClick={(e)=>{handleSubmit(e)}} id="submit">Submit</button>  
            
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        types: state.types,
    }
}

export default connect(mapStateToProps, { setLoading, postPokemon})(Create);