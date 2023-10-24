import React,{useState,useEffect} from 'react'
import { TodoForm } from './TodoForm'
import { Todo} from './Todo'
import {v4 as uuidv4 } from 'uuid';
import { EditTodoForm } from './EditTodoForm';
uuidv4();


export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos'));
    if (Array.isArray(storedTodos)) {
      setTodos(storedTodos);
    } else {
      setTodos([]);
    }
  }, []);
  

  const addTodo = (todo) => {
    const newTodo = { id: uuidv4(), task: todo, completed: false, isEditing: false };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const toggleComplete = (id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const deleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const editTodo = (id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo));
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const editTask = (task, id) => {
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo));
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };
  return (
    <div className='TodoWrapper'>
        <h1>Get Things Done</h1>
        <TodoForm addTodo = {addTodo}/>
        { todos.map((todo,index) => (
          todo.isEditing ? (
            <EditTodoForm editTodo ={editTask} task={todo}></EditTodoForm>
          ):(
            <Todo key={index} task={todo} editTodo={editTodo} toggleComplete = {toggleComplete} deleteTodo = {deleteTodo}/>
          )
        ))}
        
    </div>
  )
}
