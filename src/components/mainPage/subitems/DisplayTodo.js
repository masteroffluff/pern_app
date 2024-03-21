import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos, itemsTodoFetch } from "../../items/itemSlice";
import { Todo } from '../../items/index'
import { useNavigate } from "react-router";

export default function DisplayTodo() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const todos = useSelector(selectTodos)


    useEffect(()=>{
        dispatch(itemsTodoFetch())
    }, [dispatch]);

    const newTodo_click = (e) =>{
            e.preventDefault()
        navigate('/newtodo')
    }
    return <div data-testid="displayTodo">

        <h3>Todo</h3>
        <div className="content">
            <ul>
                {todos.map((td) => <li key={td.id}><Todo title={td.title} items={td.items}></Todo></li>)}
            </ul>
        </div>
        <button data-testid='newNote' value='newNote' onClick={newTodo_click} >New Todo</button>
    </div>
}