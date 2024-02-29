import React from "react";

export default function TodoItem({ index, value, done, callBack }) {
    const checkboxClick = (e) => {
        e.preventdefault()
        callBack(index, e.target.value)
    }
    return <div data-testid="todoItem" className='todoItem'>
        <label htmlFor="donecheckbox">{value}</label><input type='checkbox' value={done} onClick={checkboxClick} />
    </div>
}