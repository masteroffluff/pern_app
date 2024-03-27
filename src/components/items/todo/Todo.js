import React from "react";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import {todoItemsUpdateDone} from '../itemSlice'
import './todo.css'

export default function Todo({todoIndex, title, notes, items}){
    const dispatch = useDispatch()

    const callBack = (index, done)=>{
        
        dispatch(todoItemsUpdateDone({todoIndex,index,done}))
    }


    return <div data-testid="todo">
        <h4 aria-label="Title">{title}</h4>
        <div className="todo_container">
            <div className="todo">
                
                <ul>
                    {items.map(({item_text, item_done}, index)=><li key={index}><TodoItem index={index} item_text={item_text} item_done={item_done} callBack ={callBack} /></li>)}
                </ul>
                
            </div>            
            <div className="todo">
                
                <p aria-label="Description">{notes}</p>
                
            </div>

        </div>
    </div>
}