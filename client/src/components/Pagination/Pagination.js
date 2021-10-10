import React from "react";
// import {  useEffect, useState } from "react";

import {connect} from 'react-redux';
import { changePage, getPokemons, changeSort, setLoading } from "../../actions";
import {Button, activePage, Start, End, hiddenButton, Prev, Next, Pages, Pag} from "./Pagination.module.css"

export function Pagination({pages, page,  type,  
                            changePage, getPokemons, setLoading}){
    
    const handleClick = async (event)=>{
        let value = event.target.value

        switch(value){
            case '<Prev':
                if(page > pages[0]){
                    changePage(Number(page)-1)
                } 
                return

            case 'Next>':
                let lastPage = pages[pages.length-1]
                if(page < lastPage){
                        changePage(Number(page)+1)  
                } else if(page === lastPage && type === 'All'){
                        document.getElementById('next').disabled=true;
                        setLoading(true)
                        console.log(lastPage)
                        await getPokemons((lastPage+4)*10, lastPage+1) //Hace una peticion al back por 40 pokemons mas 
                        setLoading(false)
                        document.getElementById('next').disabled=false;
                    }
                return
            default:
                changePage(Number(value))
        };
    };

    
    return(
        <div className={Pag}>
            <button key={`buttonStart`} className={[page===1 ? activePage : Start, Button].join(' ')} onClick={(e)=>handleClick(e)} value="1">1</button>
            <button key="prev" id="prev" className={[Prev, Button].join(' ')} onClick={(e)=>handleClick(e)} value='<Prev'>{`<<`}</button>
                 <div className={Pages}>
                 {
                     pages.map((p)=>{
                        return <button key={`button${p}`} className={page===p ? activePage : (p>=page-2 && p <= page+2) ? Button : hiddenButton} onClick={(e)=>handleClick(e)} value={p}>{p}</button>
                    })  
                }
                 </div>
                   
            <button key="next" id="next" className={[Next,Button].join(' ')} onClick={(e)=>handleClick(e)} value='Next>'>{`>>`}</button>
            <button key={`buttonEnd`} className={[page===pages[pages.length-1] ? activePage : End, Button].join(' ')} onClick={(e)=>handleClick(e)} value={pages[pages.length-1]}>{pages[pages.length-1]}</button>
        </div>
           
    )
        }

const mapStateToProps = (state)=>{
    return {
        pages: state.pag.pages,
        page: state.pag.page,
        type: state.filters.type
    }
}
        
export default connect(mapStateToProps, {changePage, getPokemons, changeSort, setLoading})(Pagination);