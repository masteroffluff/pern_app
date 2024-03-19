import React from "react";
import TodoItem from "./TodoItem";


export default function Todo({title, value, items}){
    const callBack = ()=>{}


    return <div data-testid="todo">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        
        <ul>
            {items.map(({item_text, item_done}, index)=><li key={index}><TodoItem index={index} item_text={item_text} item_done={item_done} callBack ={callBack} /></li>)}
        </ul>
    </div>
}