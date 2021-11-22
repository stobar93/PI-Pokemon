import React, {useState} from "react";
import Style from "./SideBar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../Search/SearchBar";

export default function SideBar (){
    const [open, setOpen] = useState(false)


    return (
        <>
            <div className={Style.ToggleMenu} onClick={()=>setOpen(open=>!open)}><p>&#9776;</p></div>
            <div className={[Style.ModalBackground, open ? Style.Visible : Style.Hidden].join(" ")} onClick={()=>setOpen(false)}></div> 
            <div className={[Style.SideBar, open ? Style.Visible : Style.Hidden].join(" ")}>
            {open ? <div className={[Style.ToggleMenu, Style.CloseMenu].join(" ")} onClick={()=>setOpen(open=>!open)}><p>&#10097;</p></div> 
            :<div className={Style.ToggleMenu} onClick={()=>setOpen(open=>!open)}><p>&#9776;</p></div>}
            <SearchBar />
                <Link to="/pokemons">Pokemons</Link>
                <Link to="/pokemons/create">Create</Link>
                
            </div>
        </>
    )
}