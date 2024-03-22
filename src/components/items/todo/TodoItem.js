import React, {useState} from "react";

export default function TodoItem({ index, item_text, item_done, callBack }) {
    const checkboxClick = (e) => {
        e.preventDefault()
        callBack(index, e.target.value)
    }
    return <div data-testid="todo-item" className='todoItem'>
        <label htmlFor="donecheckbox" data-testid="todo-item-value">{item_text}</label><input data-testid="todo-item-done" value={item_text} type='checkbox' checked={item_done} onChange={checkboxClick} />
    </div>
}