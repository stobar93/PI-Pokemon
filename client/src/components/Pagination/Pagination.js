import React, { useEffect, useState } from "react";
import {connect} from 'react-redux';
import {changeLimit, changePage, newPokemons, sortPokemons} from '../../actions/index'
import { loadInfo } from "../../Utils/Methods";

export function Pagination({pokemons, pokemonsToRender, changePage, newPokemons, sortPokemons}){
    
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [pages, setPages] = useState([1,2,3,4])
    
    useEffect(()=>{
        changePage(page,limit)
    }, [page])

    useEffect(()=>{
        return pages
    }, [pages])
    // useEffect(()=>{
    //     changeLimit(limit)
    // }, [limit])

    // const handleLimitChange = (event)=>{
    //     let value = event.target.value;
    //     setLimit(Number(value))
    //     for(var i=1, j=[]; i<=(40/Number(value)); i++){
    //         j = [...j,i]
    //     }
    //     setPages(j)
    // }

    const handleSortChange = (value)=>{

        let options = {
            'ID': (a, b)=>{
                return a.id-b.id
              },
            'AZ': (a, b)=>{
                return a.name.localeCompare(b.name)
              },
            'ZA':(a, b)=>{
                return b.name.localeCompare(a.name)
              },
            'AA':(a, b)=>{
                return a.stats.Attack-b.stats.Attack
              },
            'AD':(a, b)=>{
                return b.stats.Attack-a.stats.Attack
              }
        }

        
        sortPokemons(options[value])
           
    }

    const handleClick = async (event)=>{
        let value = event.target.value;
        if(value === 'Next>'){
            let lastPage = pages[pages.length-1];
            if(page<lastPage){
                setPage(Number(page)+1)
            }else if(page === lastPage){
                document.getElementById("next").disabled = true;
                if(pokemons.length === page*limit){
                    await loadInfo(newPokemons, Math.floor((lastPage*limit/40)+1))
                }
                console.log(document.getElementById("sortOptions").value)
                
                // setPages(pages.map(p=>p+(40/limit)))
                // setPage(Number(page)+1)
                setPages([...pages,...pages.slice(-4).map(p=>p+(40/limit))])
                if(document.getElementById("sortOptions").value === 'ID'){
                    setPage(Number(page)+1)
                }else {
                    handleSortChange(document.getElementById('sortOptions').value)
                    setPage(1)}
                
                document.getElementById("next").disabled = false;
            }   
        } else if(value === '<Prev'){
            let firstPage = pages[0];
            if(page>firstPage){
                setPage(Number(page)-1)
            }else if(page === firstPage && page!==1){
                
                setPage(Number(page)-1)
                setPages(pages.map(p=>p-(40/limit)))
            }
        } else {
            setPage(Number(value))    
        }
    }

    return(
        
        //     <select id="limitInput"> {/*onChange={(e)=>handleLimitChange(e)}*/}
        //         <option value="10">10</option>
        //         <option value="20">20</option>
        //         <option value="40">40</option>
        //     </select>
        <div>
            <label htmlFor="sortOptions" id="sortInput">Sort by: </label>
            <select id="sortOptions" onChange={(e)=>handleSortChange(e.target.value)}>
                <option value="ID">ID (Default)</option>
                <option value="AZ">A - Z</option>
                <option value="ZA">Z - A</option>
                <option value="AA">Attack (Low to high)</option>
                <option value="AD">Attack (High to low)</option>
            </select>
            
            <button key="prev" id="prev" onClick={(e)=>handleClick(e)} value='<Prev'>{`<Prev`}</button>
                 {
                     pages.map((p)=>{
                        return <button key={`button${p}`} onClick={(e)=>handleClick(e)} value={p}>{p}</button>
                    })
                }
            <button key="next" id="next" onClick={(e)=>handleClick(e)} value='Next>'>{`Next>`}</button>
            </div>
        // </div>    
    )
        }

const mapStateToProps = (state)=>{
    return {
        pokemons: state.pokemons,
        pokemonsToRender: state.pokemonsToRender
    }
}
        
export default connect(mapStateToProps, {changePage, changeLimit, newPokemons, sortPokemons})(Pagination);