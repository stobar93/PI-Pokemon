import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import {changePage, newPokemons} from '../../actions/index'
import { loadInfo } from "../../Utils/Methods";

export function Pagination({pokemons, pokemonsToRender, changePage, newPokemons}){
    
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState([1,2,3,4])
    
    useEffect(()=>{
        changePage(page,limit)
    }, [page, limit])

    const countPages = (page, limit)=>{
        let p = []
        for(let i=page; i<page+(40/limit); i++){
            p.push(i)
        }

        return p
    }

    const handleClick = async (event)=>{
        let value = event.target.value;
        if(value === 'Next>'){
            let lastPage = pages[pages.length-1];
            if(page<lastPage){
                setPage(Number(page)+1)
            }else if(page === lastPage){
                await loadInfo(newPokemons, Math.floor((lastPage*limit/40)+1))
                
                setPage(Number(page)+1)
                setPages(pages.map(p=>p+4))
            }   
        } else if(value === '<Prev'){
            let firstPage = pages[0];
            if(page>firstPage){
                setPage(Number(page)-1)
            }else if(page === firstPage && page!==1){
                
                setPage(Number(page)-1)
                setPages(pages.map(p=>p-4))
            }
        } else {
            setPage(Number(value))    
        }
    }

    return(
        <div>
            <select id="limitInput">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
            </select>
            
            <div>
            <button key="prev" onClick={(e)=>handleClick(e)} value='<Prev'>{`\<Prev`}</button>
                 {
                     pages.map((p)=>{
                        return <button key={`button${p}`} onClick={(e)=>handleClick(e)} value={p}>{p}</button>
                    })
                }
            <button key="next" onClick={(e)=>handleClick(e)} value='Next>'>{`Next\>`}</button>
            </div>
        </div>    
    )
        }

const mapStateToProps = (state)=>{
    return {
        pokemons: state.pokemons,
        pokemonsToRender: state.pokemonsToRender
    }
}
        
export default connect(mapStateToProps, {changePage, newPokemons})(Pagination);