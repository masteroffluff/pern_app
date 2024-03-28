import React from "react";
import TodoItem from "./TodoItem";
import { useDispatch } from "react-redux";
import {itemsTodoUpdate, todoItemsUpdateDone} from '../itemSlice'
import './todo.css'

export default function Todo({todoIndex,item_id, title, notes, items}){
    const dispatch = useDispatch()
    
    const callBack = (index, done)=>{
        
        dispatch(todoItemsUpdateDone({todoIndex,index,done}))
    }


    const updateNotes=(e)=>{
        e.preventDefault()
        dispatch(itemsTodoUpdate({id:item_id, title, notes: e.target.value}))
    }
    const updateTitle=(e)=>{
        e.preventDefault()
        dispatch(itemsTodoUpdate({id:item_id, title: e.target.value, notes}))
    }


    return <div data-testid="todo">
        <h4 ><input aria-label="Title" style={{all:'inherit'}} type='text' defaultValue={title} onBlur={updateTitle} /></h4>
        <div className="todo_container">
            <div className="todo">
                <ul>
                    {items.map(({item_text, item_done}, index)=><li key={index}><TodoItem index={index} item_text={item_text} item_done={item_done} callBack ={callBack} /></li>)}
                </ul>
            </div>            
            <div className="todo">
                
                <textarea aria-label="Description" rows="10" cols="20"  onBlur={updateNotes} defaultValue={notes}/>
                
            </div>

        </div>
    </div>
}