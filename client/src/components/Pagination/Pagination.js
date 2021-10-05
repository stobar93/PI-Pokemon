import React, {  useState } from "react";
import {connect} from 'react-redux';
import { changeCopy, changePage } from "../../actions";
import { loadNewPokemons ,capitalLetter } from "../../Utils/Methods";


export function Pagination({pokemons, types, changeCopy, changePage}){
    
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState([1,2,3,4]);
    const [sort, setSort] = useState("ID");
    const [type, setType] = useState("All");
    const [db, setDb] = useState("all");
    
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

    // useEffect(()=>{
    //     changePage(page)
    // }, [page]);

    
    
    
    const handleDbChange = (value)=>{
        setDb(value);
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

    const handleSortChange = (value)=>{
        
        let copy = [...pokemons]
        copy = copy.sort(sortOptions[value]).filter(p=>{
            if(type === 'All') {return true}
            else {return p.types.includes(type) }
             //&& p.createdBy === db
        })
        for(var i=1,j=[];i<=Math.ceil(copy.length/10);i++){
            j.push(i)
        }
        
        changeCopy(copy);
        setPages(j);
        setPage(1);
        changePage(1);
        setSort(value);
        
    };

    const handleClick = (value)=>{
        
        switch(value){
            case '<Prev':
                if(page > pages[0]){
                    setPage(Number(page)-1)
                    changePage(Number(page)-1)
                }
                return
            case 'Next>':
                if(page < pages[pages.length-1]){
                        setPage(Number(page)+1)
                        changePage(Number(page)+1)  
                    }
                return
            default:
                setPage(Number(value));
                changePage(Number(value))
        };
    };

    return(
        <div>

            
            <label htmlFor="sortOptions" id="sortInput">Sort by: </label>
            <select id="sortOptions" onChange={(e)=>handleSortChange(e.target.value)}>
                <option key="ID" value="ID">ID (Default)</option>
                <option key="AZ" value="AZ">A - Z</option>
                <option key="ZA" value="ZA">Z - A</option>
                <option key="AA" value="AA">Attack (Low to high)</option>
                <option key="AD" value="AD">Attack (High to low)</option>
            </select>

            
            <label htmlFor="filterType" id="filterTypeInput">Filter by: </label>
            <select id="filterType" onChange={(e)=>handleFilterChange(e.target.value)}>
                <option value="All">All</option>
                {
                    types.map(t=>{
                        return <option key={`option${t.name}`} value={capitalLetter(t.name)}>{capitalLetter(t.name)}</option>
                    })
                }
            </select>

            
            <label htmlFor="filterDb" id="filterDbInput">Created by: </label>
            <select id="filterDb" onChange={(e)=>handleDbChange(e.target.value)}>
                <option value="all">All</option>
                <option value="user">User</option>
                <option value="api">API</option>
            </select>
            
            
            <button key="prev" id="prev" onClick={(e)=>handleClick(e.target.value)} value='<Prev'>{`<Prev`}</button>
                 {
                     pages.map((p)=>{
                        return <button key={`button${p}`} onClick={(e)=>handleClick(e.target.value)} value={p}>{p}</button>
                    })
                }
            <button key="next" id="next" onClick={(e)=>handleClick(e.target.value)} value='Next>'>{`Next>`}</button>
            </div>
           
    )
        }

const mapStateToProps = (state)=>{
    return {
        pokemons: state.pokemons,
        types: state.types
    }
}
        
export default connect(mapStateToProps, {changeCopy, changePage})(Pagination);