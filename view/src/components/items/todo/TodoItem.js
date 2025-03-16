import React/* , {useState} */ from "react";

export default function TodoItem({ index, item_text, item_done, callBack }) {

   // const [doneCheck,setDoneCheck] = useState(item_done)
    const checkboxClick = (e) => {
        e.preventDefault()
        //setDoneCheck(!doneCheck)
        
        callBack(index, !item_done)
    }
    
    return <div data-testid="todo-item" className='todo_item' onClick={checkboxClick}>
        <span className={item_done?'todo_done':''} htmlFor="donecheckbox" data-testid="todo-item-value" >{item_text}</span>
    </div>
}