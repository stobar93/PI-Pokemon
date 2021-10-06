import React, {  useEffect, useState } from "react";
import {connect} from 'react-redux';
import { changeCopy, changePage, newPokemons, setPages, setPage, setDb, setSort, setType } from "../../actions";
import { loadNewPokemons ,capitalLetter } from "../../Utils/Methods";
import Style from "./Pagination.module.css"

export function Pagination({pokemons, types, queryPage, 
                            pages, page, sort, type, db,
                            setPages, setPage, setSort, setType, setDb, 
                            changeCopy, changePage, newPokemons}){
    
    // const [page, setPage] = useState(1);
    // const [pages, setPages] = useState([1,2,3,4]);
    // const [sort, setSort] = useState("ID");
    // const [type, setType] = useState("All");
    // const [db, setDb] = useState("all");
    
    

    const sortOptions = {
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
    };   
    
    const handleDbChange = (value)=>{
        setDb(db);
    };

    const handleFilterChange = (value)=>{
        let copy = [...pokemons]
        copy = copy.sort(sortOptions[sort]).filter(p=>{
            if(value === 'All') {return true}
            else {return p.types.includes(value) }
             //&& p.createdBy === db
        })
        for(var i=1,j=[];i<=Math.ceil(copy.length/10);i++){
            j.push(i)
        }
        
        changeCopy(copy);
        setPages(j);
        setPage(1);
        changePage(1);
        setType(value);
    };

    const countPages = (arr)=>{
        let length
        if(Array.isArray(arr)){length = Math.ceil(arr.length/10)}
        else length = arr
        for(var i=1,j=[];i<=length;i++){
            j.push(i)
        }
        return j
    }

    const handleSortChange = (value)=>{
        
        let copyPokemons = [...pokemons]
        copyPokemons = copyPokemons.sort(sortOptions[value]).filter(p=>{
            if(type === 'All') {return true}
            else {return p.types.includes(type) }
             //&& p.createdBy === db
        })
        // for(var i=1,j=[];i<=Math.ceil(copy.length/10);i++){
        //     j.push(i)
        // }
        
        changeCopy(copyPokemons);
        setPages(countPages(copyPokemons));
        setPage(1);
        changePage(1);
        setSort(value);
        
    };

    const handleClick = async (value)=>{
        
        switch(value){
            case '<Prev':
                if(page > pages[0]){
                    setPage(Number(page)-1)
                    changePage(Number(page)-1)
                } 
                return
            case 'Next>':
                let lastPage = pages[pages.length-1]
                if(page < lastPage){
                        setPage(Number(page)+1)
                        changePage(Number(page)+1)  
                    } else if(page === lastPage && type === 'All' && page < 15){
                        document.getElementById('next').disabled=true;
                        await loadNewPokemons(newPokemons, queryPage+1)
                        setPages(countPages(Math.ceil(pokemons.length/10)+4));
                        if(sort === "ID"){
                            setPage(page + 1)   
                            changePage(page + 1);
                        }else{setPage(1);
                        changePage(1);
                        setSort("ID")}
                        document.getElementById('next').disabled=false;
                    }
                return
            default:
                setPage(Number(value));
                changePage(Number(value))
        };
    };

    return(
        <div>

            <div>
            <label htmlFor="sortOptions" id="sortInput">Sort by: </label>
            <select value={sort} id="sortOptions" onChange={(e)=>handleSortChange(e.target.value)}>
                <option key="ID" value="ID">ID (Default)</option>
                <option key="AZ" value="AZ">A - Z</option>
                <option key="ZA" value="ZA">Z - A</option>
                <option key="AA" value="AA">Attack (Low to high)</option>
                <option key="AD" value="AD">Attack (High to low)</option>
            </select>

            
            <label htmlFor="filterType" id="filterTypeInput">Filter by: </label>
            <select value={type} id="filterType" onChange={(e)=>handleFilterChange(e.target.value)}>
                <option value="All">All</option>
                {
                    types && types.map(t=>{
                        return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                    })
                }
            </select>

            
            <label htmlFor="filterDb" id="filterDbInput">Created by: </label>
            <select value={db} id="filterDb" onChange={(e)=>handleDbChange(e.target.value)}>
                <option value="All">All</option>
                <option value="user">User</option>
                <option value="api">API</option>
            </select>

            </div>
            
            
            
            <button key="prev" id="prev" onClick={(e)=>handleClick(e.target.value)} value='<Prev'>{`<Prev`}</button>
                 {
                     pages.map((p)=>{
                        return <button key={`button${p}`} className={page===p ? Style.activePage : Style.pageButton} onClick={(e)=>handleClick(e.target.value)} value={p}>{p}</button>
                    })
                    
                }
                
            <button key="next" id="next" onClick={(e)=>handleClick(e.target.value)} value='Next>'>{`Next>`}</button>
            </div>
           
    )
        }

const mapStateToProps = (state)=>{
    return {
        pokemons: state.pokemons,
        types: state.types,
        queryPage: state.queryPage,
        pages: state.pag.pages,
        page: state.pag.page,
        sort: state.pag.sort,
        type: state.pag.type,
        db: state.pag.db
    }
}
        
export default connect(mapStateToProps, {changeCopy, changePage, newPokemons, setPages, setPage, setSort, setType, setDb})(Pagination);