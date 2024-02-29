import React from "react";
import TodoItem from "./TodoItem";


export default function Todo({title, value, items}){
    const callBack = ()=>{}


    return <div data-testid="todo">
        <h4 aria-label="Title">{title}</h4>
        <p aria-label="Description">{value}</p>
        <ul>
            {items.map(({value, done}, index)=><li key={index}><TodoItem index={index} value={value} done={done} callBack ={callBack} /></li>)}
        </ul>
    </div>
}