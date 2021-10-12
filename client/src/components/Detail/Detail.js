import React, {useState, useEffect} from "react";
import {Img} from "react-image";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { capitalLetter } from "../../Utils/Methods";
import axios from 'axios';
import Loading from "../Loading/Loading";
import LoadingImg from "../Loading/LoadingImg";
import typeButtons from '../Styles/typeButtons.module.css';
import Container from '../Styles/Container.module.css'
import {img} from '../Card/Card.module.css'
import BrokenImg from "../Loading/brokenImg";

export function Detail ({id, currentPokemons, search}){
    let [detail, setDetail] = useState({});
    let history = useHistory();


    useEffect(()=>{
         loadDetail(id)
        
    }, []);

    const loadDetail = async (id)=>{
        let pokemonDetail =  await axios(`http://192.168.1.5:3001/pokemons/${id}`)
        .then(response => response.data[0])
        
        setDetail(pokemonDetail)
    }
    
    const handleClick =()=>{
        history.goBack()
      }
    

    return detail.name ? (
        <div>
            <button onClick={()=>handleClick()}>X Close</button>
            {/* <Link to="/pokemons"><button onClick={()=>handleClick()}>X Close</button></Link> */}
            <h1>{detail.name}</h1>
            <div className={Container.imgDetail}>
            <Img className={img} src={detail.imgUrl} unloader={<BrokenImg/>} loader={<LoadingImg/>} alt={detail.name}/>
            </div>
            
            {
            detail.types && detail.types.map(t=>{
            return <button className={[typeButtons[t], typeButtons.buttonType].join(' ')} key={`button${t}`}   value={t}>{t}</button> 
            }).slice(0,2)
            }

            {
                detail && Array.from(Object.keys(detail)).filter(i=>{
                return i !== 'name' && i !== 'imgUrl' && i !== 'stats' && i !== 'types'
                }).map(s=>{
                    return <p key={s}>{capitalLetter(s)}: {detail[s]}</p>
                }) 
            }

            
            {   
                detail && Array.from(Object.keys(detail.stats)).filter(p=>{return p!=='Special-attack' && p!=='Special-defense'}).map(s=>{
                return <p key={s}>{capitalLetter(s)}: {detail.stats[s]}</p>
                }) 
            }  
        </div>
    ) : <Loading />
    
}

const mapStateToProps = (state)=>{
    return {
        currentPokemons: state.currentPokemons,
        search: state.search
    }
}
        
export default connect(mapStateToProps)(Detail);

// {detail.types.map(t=>{
//     return <button className={[typeButtons[t], typeButtons.buttonType].join(' ')} key={`button${t}`}   value={t}>{t}</button> 
// }).slice(0,2)}

// {
// Array.from(Object.keys(detail)).filter(i=>{
//     return i !== 'name' && i !== 'imgUrl' && i !== 'stats' && i !== 'types'
// }).map(s=>{
    
//    return <p key={s}>{capitalLetter(s)}: {detail[s]}</p>
// })
// }

// {
// Array.from(Object.keys(detail.stats)).filter(p=>{return p!=='Special-attack' && p!=='Special-defense'}).map(s=>{
//    return <p key={s}>{capitalLetter(s)}: {detail.stats[s]}</p>
// })
// }