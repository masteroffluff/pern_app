import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TodoItem from "./TodoItem";
import { itemsTodoAdd, hasErrorItems, isLoadingItems } from '../itemSlice'
import { setPopup } from "../../mainPage/popupSlice";
import { useNavigate } from "react-router";

export default function NewTodo() {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const hasError = useSelector(hasErrorItems)
    const isLoading = useSelector(isLoadingItems)

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
        const newTodos = [...todoItems, { item_text: newItem, item_done: false }]
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
        dispatch(itemsTodoAdd({ title, notes, items:todoItems })).unwrap()
        navigate('/')
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
            <textarea rows="4" cols="50"  data-testid="notes" type='text' id='value' onChange={notesUpdate} value={notes} /><br />
            <div aria-label='to do items' data-testid="todoItems">
                <ul>
                    {todoItems.map((todoItem, index) => <li  key={index} >
                            <TodoItem index={index} item_text={todoItem.item_text} item_done={todoItem.item_done} callBack={todoItemCallback} />
                            <button aria-label="Remove Todo Item" value="Remove Todo Item" onClick={(e) => removeTodoItem(e, index)}>Remove Todo Item</button>
                        </li>)}
                </ul>
            </div>

            <label htmlFor="newItem">New Item</label><br />
            <input data-testid="newItem" type='text' id='newItem' onChange={newItemUpdate} value={newItem} />
            <button aria-label="Add Todo Item" disabled={!newItem} value='Add Todo Item' onClick={addTodoItem}>Add Todo Item</button>
            <br />
            <button type='button' data-testid='cancelButton' aria-label="Cancel" value='Cancel' onClick={cancelTodo} >Cancel</button>
            <button type='submit' disabled={(!title||!notes||todoItems.length===0)} data-testid='confirmButton' aria-label="Done" value='Done'>Done</button>
        </form>
        <p>{isLoading?'Generating Todo':hasError?<span className='errorMessage'>{hasError}</span>:<></>}</p>
    </div>
}