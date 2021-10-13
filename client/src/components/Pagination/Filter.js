import React from "react";
import { capitalLetter, sortOptions } from "../../Utils/Methods";
import {connect} from 'react-redux';
import { changeFilter, resetFilters } from "../../actions";
import Button from "../Styles/typeButtons.module.css"
import Container from "../Styles/Container.module.css"
import Sort from './Sort'

export function Filter ({pokemons, sort, filters, changeFilter, types, resetFilters}){

    const handleDbChange = (event)=>{
        let value = event.target.value;
        let copy = [...pokemons].sort(sortOptions[sort]).filter(p=>{
            if(value === 'All') {return true}
            else {return p.createdBy === value}
             //&& p.createdBy === db FALTA APLICAR EL FILTRO PARA CREATED BY
        }).filter(q=>{
            if(filters.type === 'All') {return true}
            else {return q.types.includes(filters.type)}
        })
        
        if(copy.length === 0 ) { alert("Can't find any match") }
        else( changeFilter('db', value, copy) )
    };

    const handleTypeChange = (event)=>{
        let value = event.target.value;
        let copy = [...pokemons].sort(sortOptions[sort]).filter(p=>{
            if(value === 'All') {return true}
            else {return p.types.includes(value) }
             //&& p.createdBy === db FALTA APLICAR EL FILTRO PARA CREATED BY
        }).filter(q=>{
            if(filters.db === 'All') {return true}
            else {return q.createdBy === filters.db}
        })
        
        if(copy.length === 0 ) {
            alert("Can't find any match")
            
        }
        else(changeFilter('type', value, copy))
        
        
    };

    const handleQuitFilters = (filter)=>{
        
        let copy = [...pokemons].sort(sortOptions[sort]).filter(p=>{
            if(filter === 'type' || filters.type === 'All') {return true}
            else {return p.types.includes(filters.type) }
             //&& p.createdBy === db FALTA APLICAR EL FILTRO PARA CREATED BY
        }).filter(q=>{
            if(filter === 'db' || filters.db === 'All') {return true}
            else {return q.createdBy === filters.db}
        })
        
        
        
        resetFilters(filter, copy)
    }

    return (
        <div className={Container.Bar}>
            <div className={Container.Dropdown}>
                <label htmlFor="filterType">Filter by: </label>
                <select value={filters.type} id="filterType" onChange={(e)=>handleTypeChange(e)}>
                    <option value="All">All</option>
                    {
                        types && types.sort(sortOptions['AZ']).map(t=>{
                            let name = capitalLetter(t.name)
                            return <option key={`option${name}`} value={name}>{name}</option>
                        })
                    }
                </select>
                {filters.type !== 'All' ?  <div className={[Button[filters.type], Button.Div].join(" ")}><span>{`${filters.type} `}</span><button className={[Button.closeButton, Button[filters.type]].join(" ")} onClick={()=>handleQuitFilters('type')}>X</button></div> : null}
                
            </div>
            <Sort/>
           <div className={Container.Dropdown}>
           <label htmlFor="filterDb" id="filterDbInput">Created by: </label>
                <select value={filters.db} id="filterDb" onChange={(e)=>handleDbChange(e)}>
                    <option value="All">All</option>
                    <option value="user">User</option>
                    <option value="API">API</option>
                </select>
                
                { filters.db !== 'All' ? <div className={`${Button.Div} ${Button.CloseDiv}`}><span>{`${filters.db} `}</span><button className={Button.closeButton} onClick={()=>handleQuitFilters('db')}>X</button></div> : null}
           </div>
                
            
            
        </div>
    )
}

const mapStateToProps = (state)=>{
    return {
        pokemons: state.pokemons, 
        sort: state.sort, 
        filters: state.filters,
        types: state.types
    }
}

export default connect(mapStateToProps, {changeFilter, resetFilters})(Filter)