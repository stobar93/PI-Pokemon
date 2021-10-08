import React from "react";
import { capitalLetter, sortOptions } from "../../Utils/Methods";
import {connect} from 'react-redux';
import { changeFilter } from "../../actions";


export function Filter ({pokemons, sort, filters, changeFilter, types}){

    const handleDbChange = (event)=>{
        let value = event.target.value;
        let copy = [...pokemons].sort(sortOptions[sort]).filter(p=>{
            return true
            // if(value === 'All') {return true}
            // else {return p.createdBy === value }
             //&& p.createdBy === db FALTA APLICAR EL FILTRO PARA CREATED BY
        })
        
        changeFilter('db', value, copy)
    };

    const handleTypeChange = (event)=>{
        let value = event.target.value;
        let copy = [...pokemons].sort(sortOptions[sort]).filter(p=>{
            if(value === 'All') {return true}
            else {return p.types.includes(value) }
             //&& p.createdBy === db FALTA APLICAR EL FILTRO PARA CREATED BY
        })
        
        changeFilter('type', value, copy)
        
    };

    return (
        <div>
            <label htmlFor="filterType">Filter by: </label>
            <select value={filters.type} id="filterType" onChange={(e)=>handleTypeChange(e)}>
                <option value="All">All</option>
                {
                    types && types.map(t=>{
                        let name = capitalLetter(t.name)
                        return <option key={`option${name}`} value={name}>{name}</option>
                    })
                }
            </select>

            <label htmlFor="filterDb" id="filterDbInput">Created by: </label>
            <select value={filters.db} id="filterDb" onChange={(e)=>handleDbChange(e)}>
                <option value="All">All</option>
                <option value="user">User</option>
                <option value="api">API</option>
            </select>
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

export default connect(mapStateToProps, {changeFilter})(Filter)