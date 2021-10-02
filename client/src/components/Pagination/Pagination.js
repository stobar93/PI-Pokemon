import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import {changePage} from '../../actions/index'

export function Pagination({pokemons, pokemonsToRender, changePage}){

    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    useEffect(()=>{console.log(limit)})
    useEffect(()=>{console.log(page)})
    
    
    const countPages = ()=>{
        let pages = []
        let numPages = pokemons.length%pokemonsToRender.length===0 ? pokemons.length/pokemonsToRender.length : Math.ceil(pokemons.length/pokemonsToRender.length)
        for(let i=1; i<=numPages; i++){
            pages.push(i)
        }

        return ['<Prev',...pages,'Next>'];
    }

    let pages = countPages()


    const handlePaginationClick =  async (event)=>{
        let value = event.target.value;

        //Si value = next, llamado a la api
        //Pasar a la siguiente pagina
        //
        setPage(value)
        changePage(value, limit)
        
    }

    const handleLimitChange = ()=>{
        let input = document.getElementById('limitInput');
        let prevLimit = limit;
        let newPageNumber = Math.ceil((prevLimit*(page-1))+1/input.value)

        setLimit(input.value);
        setPage(newPageNumber)
        changePage(newPageNumber, input.value)
     }

    return(
        <div>
            <select onChange={()=>handleLimitChange()} id="limitInput">
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="40">40</option>
            </select>
            
            <div>
                 {
                    pages && pages.map((p)=>{
                        return <button key={`button${p}`} onClick={e=>handlePaginationClick(e)} value={p}>{p}</button>
                    })
                }
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
        
export default connect(mapStateToProps, {changePage})(Pagination);