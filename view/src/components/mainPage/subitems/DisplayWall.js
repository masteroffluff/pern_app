import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWall, wallFetch } from "../wallSlice";
import DisplayItem from "../DisplayItem";
import { useNavigate } from "react-router";
import { itemsNoteFetch } from "../../items/itemSlice";

export default function DisplayWall() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const wall = useSelector(selectWall)
    
    useEffect(()=>{
        dispatch(wallFetch())
        dispatch(itemsNoteFetch())
    }, [dispatch]);

    const newNote_click = (e) =>{
        e.preventDefault()
        navigate('/main/newnote')
    }


    return <div id='wall' data-testid="displayWall" className="wallContainer">
        <h3>My Wall</h3>
        <div className="content">
            <ul className="wall">
                {wall.map((e, i) => <li data-testid='wallItem' key={i}><DisplayItem data={e} /> </li>)}
            </ul>
        </div>
        <button data-testid='newNote' value='newNote' onClick={newNote_click} >New Note</button>
    </div>
}