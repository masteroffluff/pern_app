import React from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../../items/itemSlice";
import { Todo } from '../../items/index'
import { useNavigate } from "react-router";

export default function DisplayTodo() {
    const todos = useSelector(selectTodos)
    const navigate = useNavigate()
    const newTodo_click = (e) =>{
            e.preventDefault()
        navigate('/newtodo')
    }
    return <div data-testid="displayTodo">

        <h3>Todo</h3>
        <ul>
            {todos.map((td) => <li key={td.id}><Todo title={td.title} todoItems={td.todoItems}></Todo></li>)}
        </ul>
        <button data-testid='newNote' value='newNote' onClick={newTodo_click} >New Todo</button>
    </div>
}