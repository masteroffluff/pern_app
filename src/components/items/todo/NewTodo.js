import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { itemsTodoAdd } from '../itemSlice'
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";

export default function NewTodo() {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(setPopup(true))
    return ()=>dispatch(setPopup(false))
    },[dispatch])
    
    const [todoItems, setTodoItems] = useState([])

    const [title, setTitle] = useState('')
    const [notes, setNotes] = useState('')
    const [newItem, setNewItem] = useState('')

    const titleUpdate = (e) => {
        e.preventDefault();
        setTitle(e.target.value)
    }
    const notesUpdate = (e) => {
        e.preventDefault();
        setNotes(e.target.value)
    }
    const newItemUpdate = (e) => {
        e.preventDefault();
        setNewItem(e.target.value)
    }
    const todoItemCallback = (index, done) => {
        const newArray = todoItems.map((v, i) => i === index ? v.done = done : v)
        setTodoItems(newArray)
    }
    const addTodoItem = (e) => {
        e.preventDefault()
        const newTodos = [...todoItems, { value: newItem, done: false }]
        setTodoItems(newTodos)
        setNewItem('')
    }
    const removeTodoItem = (e, index) => {
        e.preventDefault()
        const newTodos = todoItems.filter((_, i) => i !== index)
        setTodoItems(newTodos)
    }

    const submitTodo=(e)=>{
        e.preventDefault()
        dispatch(itemsTodoAdd({ title, notes, items:todoItems }))
    }
    const cancelTodo=(e)=>{
        e.preventDefault()
        navigate('/')
    }

    return <div data-testid="newTodo" className='popup'>
        <h3>Add Todo</h3>
        <form onSubmit={submitTodo}>
            <label htmlFor="title">Title</label><br />
            <input data-testid="title" type='text' id='title' onChange={titleUpdate} value={title} /><br />

            <label htmlFor="value">To Do Notes</label><br />
            <input data-testid="notes" type='text' id='value' onChange={notesUpdate} value={notes} /><br />
            <div aria-label='to do items' data-testid="todoItems">
                <ul>
                    {todoItems.map((todoItem, index) => <li  key={index} ><TodoItem index={index} value={todoItem.value} done={todoItem.done} callBack={todoItemCallback} />
                        <button aria-label="Remove Todo Item" value="Remove Todo Item" onClick={(e) => removeTodoItem(e, index)} /></li>)}
                </ul>
            </div>
            <label htmlFor="newItem">New Item</label>
            <input data-testid="newItem" type='text' id='newItem' onChange={newItemUpdate} value={newItem} />
            <button aria-label="Add Todo Item" value='Add Todo Item' onClick={addTodoItem}>Add Todo Item</button>
            <br />
            <button type='button' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelTodo} >Cancel</button>
            <button type='submit' data-testid='confirmButton' aria-label="Done" value='Done'>Done</button>
        </form>
    </div>
}