import React from "react";
// import {  useEffect, useState } from "react";

import {connect} from 'react-redux';
import { changePage, getPokemons, changeSort } from "../../actions";
import Style from "./Pagination.module.css"

export function Pagination({pages, page,  type,  
                            changePage, getPokemons, changeSort}){
    
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
                } else if(page === lastPage && type === 'All' && page < 15){
                        document.getElementById('next').disabled=true;
                        await getPokemons((lastPage+4)*10, lastPage+1) //Hace una peticion al back por 40 pokemons mas 
                        document.getElementById('next').disabled=false;
                    }
                return
            default:
                changePage(Number(value))
        };
    };

    
    return(
        <div>
            <button key="prev" id="prev" onClick={(e)=>handleClick(e)} value='<Prev'>{`<Prev`}</button>
                 {
                     pages.map((p)=>{
                        return <button key={`button${p}`} className={page===p ? Style.activePage : Style.pageButton} onClick={(e)=>handleClick(e)} value={p}>{p}</button>
                    })  
                }  
            <button key="next" id="next" onClick={(e)=>handleClick(e)} value='Next>'>{`Next>`}</button>
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
        
export default connect(mapStateToProps, {changePage, getPokemons, changeSort})(Pagination);