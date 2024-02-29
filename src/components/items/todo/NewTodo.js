import React, {useState} from "react";
import TodoItem from "./TodoItem";

export default function NewTodo(){

    const [todoItems, setTodoItems] = useState([])

    const todoItemCallback =(index,done) =>{
        const newArray = todoItems.map((v,i)=>i===index?v.done=done:v)
        setTodoItems (newArray)
    }

    return <div data-testid="newTodo">
        <h3>Add Todo</h3>
        <div data-testid="todoItems">
            <ul>
                {todoItems.map((todoItem, index)=><li><TodoItem key={index} index={index} value ={todoItem.value} done={todoItem.done} callBack={todoItemCallback} /></li>)}
            </ul>
        </div>



    </div>
}