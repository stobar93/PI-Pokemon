import React, {useState, useEffect} from "react";
import {Img} from "react-image";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import axios from 'axios';

//Loading fallback components
import Loading from "../Loading/Loading";
import LoadingImg from "../Loading/LoadingImg";
import BrokenImg from "../Loading/brokenImg";

//Stylesheets
import typeButtons from '../Styles/typeButtons.module.css';
import Container from '../Styles/Container.module.css'
import {img} from '../Card/Card.module.css'

//Methods
import { capitalLetter } from "../../Utils/Methods";


export default function Detail ({id}){
    //React state
    let [detail, setDetail] = useState({});

    //React useHistory hook.
    let history = useHistory();

    //ComponentDidMount - Request pokemon info by Id
    useEffect(()=>{ loadDetail(id) }, [] ); 

    //Method to search pokemon details by Id
    const loadDetail = async (id)=>{
        let pokemonDetail =  await axios(`http://192.168.1.5:3001/pokemons/${id}`)
        .then(response => response.data[0])
        
        setDetail(pokemonDetail)
    }
    
    //Handle 'close' button. Return to previous page
    const handleClick =()=>{
        history.goBack()
      }
    
      //If detail has information, render component
      //else render <Loading/>.
    return Object.keys(detail).length>0 ? (
        <div>
            <button onClick={()=>handleClick()}>X Close</button>
                {/* Tried to return to prev page with link, but there are two options to go to:
                    /pokemons or /pokemons/search 
                <Link to="/pokemons"><button onClick={()=>handleClick()}>X Close</button></Link> */}
            <h1>{detail.name}</h1>
            <div className={Container.imgDetail}>
                {/* Img component from react-image library to load fallback images */}
                <Img className={img} src={detail.imgUrl} unloader={<BrokenImg/>} loader={<LoadingImg/>} alt={detail.name}/>
            </div>
               
            {
                /* Render pokemon type buttons from React state
                    Dinamyc CSS with CSS modules based on each type */
                detail.types && detail.types.map(t=>{
                return <button className={[typeButtons[t], typeButtons.buttonType].join(' ')} key={`button${t}`}   value={t}>{t}</button> 
                }).slice(0,2)
            }

            {   /*Builds an array from detail keys
                    then filter and map to get only id, height, weight and createdBy properties*/ 
                Array.from(Object.keys(detail)).filter(i=>{
                return i !== 'name' && i !== 'imgUrl' && i !== 'stats' && i !== 'types'
                }).map(s=>{
                    return <p key={s}>{capitalLetter(s)}: {detail[s]}</p>
                }) 
            }

            {   /*Builds an array from detail.stats keys
                    then filter to exclude Special stats*/
                Array.from(Object.keys(detail.stats)).filter(p=>{return p!=='Special-attack' && p!=='Special-defense'}).map(s=>{
                return <p key={s}>{capitalLetter(s)}: {detail.stats[s]}</p>
                }) 
            }  
        </div>
    ) : <Loading />   
}