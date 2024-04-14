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
        navigate('/main/newtodo')
    }
    return <div data-testid="displayTodo">

        <h3>Todo</h3>
        <div className="content">
            
                {todos.map((td,index) => <div key={index}><Todo todoIndex={index} item_id={td.id} title={td.title} notes={td.notes} items={td.items}></Todo></div>)}
            
        </div>
        <button data-testid='newTodo' value='newTodo' onClick={newTodo_click} >New Todo</button>
    </div>
}