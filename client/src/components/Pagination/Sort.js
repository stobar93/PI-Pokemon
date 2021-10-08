import React from "react";
import { connect } from "react-redux";
import { sortOptions } from "../../Utils/Methods";
import { changeSort } from "../../actions";

export function Sort ({sort, type, pokemons, changeSort}){
 
    const handleSortChange = (event)=>{
        let value = event.target.value
        let copy = [...pokemons].sort(sortOptions[value]).filter(p=>{
            if(type === 'All') {return true}
            else {return p.types.includes(type) }
             //&& p.createdBy === db // Pendiente el filtro de DB
        })
        changeSort(value, copy)   
    };

    return (
        <>
            <label htmlFor="sortOptions" id="sortInput">Sort by: </label>
            <select value={sort} id="sortOptions" onChange={(e)=>handleSortChange(e)}>
                <option key="ID" value="ID">ID (Default)</option>
                <option key="AZ" value="AZ">A - Z</option>
                <option key="ZA" value="ZA">Z - A</option>
                <option key="AA" value="AA">Attack (Low to high)</option>
                <option key="AD" value="AD">Attack (High to low)</option>
            </select>
        </>
    )
}

const mapStateToProps = (state)=>{
    return {
        sort: state.sort,
        type: state.filters.type,
        pokemons: state.pokemons
    }
}

export default connect(mapStateToProps, {changeSort})(Sort);