import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectWall, wallFetch } from "../wallSlice";
import DisplayItem from "../DisplayItem";
import { useNavigate } from "react-router";

export default function DisplayWall() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const wall = useSelector(selectWall)
    
    const newNote_click = (e) =>{
        e.preventDefault()
        navigate('/newnote')
    }
    useEffect(()=>{
        dispatch(wallFetch())
    }, [dispatch]);

    return <div data-testid="displayWall" className="wallContainer">
        <h3>My Wall</h3>
        <ul className="wall">
            {wall.map((e, i) => <li data-testid='wallItem' key={i}><DisplayItem data={e} /> </li>)}
        </ul>
        <button data-testid='newNote' value='newNote' onClick={newNote_click} >New Note</button>
    </div>
}