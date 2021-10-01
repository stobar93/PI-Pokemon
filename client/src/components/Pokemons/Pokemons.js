import React, { useState } from "react";
import {connect} from 'react-redux';
import Card from "../Card/Card";


export function Pokemons({pokemons}){
   
    const [page, setPage] = useState({page:1, limit:10});
    
    const countPages = ()=>{
        let pages = []
        let numPages = pokemons.length%page.limit===0 ? pokemons.length/page.limit : Math.ceil(pokemons.length/page.limit)
        for(let i=1; i<=numPages; i++){
            pages.push(i)
        }
        pages.push('Next>')
        return pages;
    }

    const handlePaginationClick = (event)=>{
        console.log(event)
        setPage({...page, page:event.target.value})
    }

    const handleLimitChange = ()=>{
        let input = document.getElementById('limitInput');
        setPage({...page, limit:input.value});
    }
    
    let pages = countPages()
    
    
    
    return (
        <div>
            <h1>Pokemons</h1>
            {/* <input type="number" onChange={()=>handleLimitChange()} id="limitInput"  /> */}
            
            {/* <label>Limit: </label> */}
            <select onChange={()=>handleLimitChange()} placeholder={page.limit} id="limitInput">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
            </select>
            
            {
                pages && pages.map((p)=>{
                    return <button key={`button${p}`} onClick={e=>handlePaginationClick(e)} value={p}>{p}</button>
                })
            }

            { 
                pokemons && pokemons.map(p=>{
                    return <Card key={p.id} name={p.name} id={p.id} img={p.img} types={p.types} />
                }).filter((p,i)=>{
                    return i<page.limit*page.page && i>=(page.limit*(page.page-1))
                })
            }
            
            

        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        pokemons: state.pokemon
    }
}

export default connect(mapStateToProps)(Pokemons);