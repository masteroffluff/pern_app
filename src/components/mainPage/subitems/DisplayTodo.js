import React from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../../items/itemSlice";
import { Todo } from '../../items/index'

export default function DisplayTodo(){
    const todos = useSelector(selectTodos)
    return <div data-testid="displayTodo">
         
         <h3>Todo</h3>
         <ul>
            {todos.map((td)=><li><Todo key={td.id} title={td.title} todoItems={td.todoItems}></Todo></li>)}    
        </ul> 

    </div>
}