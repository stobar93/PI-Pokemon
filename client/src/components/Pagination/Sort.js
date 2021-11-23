import React from "react";
import { connect } from "react-redux";
import { sortOptions } from "../../Utils/Methods";
import { changeSort } from "../../actions";
import Container from '../Styles/Container.module.css'
import Button from "../Styles/typeButtons.module.css";

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
        <div className={Container.Dropdown}>
            <label className={Button.SimpleLabel} htmlFor="sortOptions" id="sortInput">Sort by: </label>
            <select className={Button.Select} value={sort} id="sortOptions" onChange={(e)=>handleSortChange(e)}>
                <option key="ID" value="ID">ID (Asc.)</option>
                <option key="IDd" value="IDd">ID (Desc.)</option>
                <option key="AZ" value="AZ">A - Z</option>
                <option key="ZA" value="ZA">Z - A</option>
                <option key="AA" value="AA">Attack (Low to high)</option>
                <option key="AD" value="AD">Attack (High to low)</option>
                <option key="length" value="length">Length</option>
            </select>
        </div>
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