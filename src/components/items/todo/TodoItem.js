import React from "react";

export default function TodoItem({ index, value, done, callBack }) {
    const checkboxClick = (e) => {
        e.preventdefault()
        callBack(index, e.target.value)
    }
    return <div data-testid="todo-item" className='todoItem'>
        <label htmlFor="donecheckbox" data-testid="todo-item-value">{value}</label><input data-testid="todo-item-done" value={value} type='checkbox' checked={done} onChange={checkboxClick} />
    </div>
}