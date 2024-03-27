import React,{ useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTodos, itemsTodoFetch, itemsTodoItemsUpdate } from "../../items/itemSlice";
import { Todo } from '../../items/index'
import { useNavigate } from "react-router";

export default function DisplayTodo() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const todos = useSelector(selectTodos)


    useEffect(()=>{
        dispatch(itemsTodoFetch())
    }, [dispatch]);

    const update=()=>{
       dispatch(itemsTodoItemsUpdate()) 
    }

    const newTodo_click = (e) =>{
            e.preventDefault()
        navigate('/newtodo')
    }
    return <div data-testid="displayTodo">

        <h3>Todo</h3>
        <button onClick={update}>sync</button>
        <div className="content">
            
                {todos.map((td,index) => <div key={index}><Todo todoIndex={index} title={td.title} notes={td.notes} items={td.items}></Todo></div>)}
            
        </div>
        <button data-testid='newNote' value='newNote' onClick={newTodo_click} >New Todo</button>
    </div>
}