import React,{useState} from 'react'

export const TodoForm = ({addTodo}) => {
    const [value,setValue] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
        addTodo(value)
        setValue('');
    }
  return (
    <form className="TodoForm" onSubmit={handleSubmit}>
        <input type="text" className='todo-input' value={value} onChange={(event)=>{setValue(event.target.value)}} placeholder='What is the task today ?'/>
        <button type="submit" className="todo-btn">Add Task</button>
    </form>
  )
}
