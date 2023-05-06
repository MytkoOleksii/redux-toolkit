import React, {useEffect, useState} from 'react';
import {
    addNewToto,
    addTodo,
    deleteTodo,
    fetchTodos,
    removeLastTodo,
    toggleComplete,
    toggleStatus
} from "../store/SliceTodo";
import {useDispatch, useSelector} from "react-redux";
import s from './todo.module.css'


function Todo(props) {
    const [text, setText] = useState('');
    const todo = useSelector(state => state.todo.todos);
    const dispatch = useDispatch()


    useEffect( () => {
        dispatch(fetchTodos())
    },[dispatch])

    let handlerText = (text) => {
        if (text.trim().length) {
            dispatch(addNewToto(text))
            setText('')
        } else
        alert(' add new text todo')
    }

   /* let handlerText = (text) => {
        if (text.trim().length) {
            dispatch(addTodo(text))
            setText('')
        }
    }*/

    return (
        <div>
            Todo
            <input onChange={(e) => setText(e.currentTarget.value)} value={text} />
           <button onClick={() => handlerText(text) }> add</button> {/*Добавление на сервер*/}
          {/*  <button onClick={() => handlerText(text) }> add</button>*/} {/*Мое добавление*/}
            <button disabled={true} > delete</button>
            <ul>
                {todo?.map(todo =>
                    <li  className={s.styleInput}  key={todo.id}>
                       {/* <input type={'checkbox'} checked={todo.completed} onChange={() => dispatch(toggleStatus(todo.id))}/> Статус на сервере*/}
                       <input type={'checkbox'} checked={todo.completed} onChange={() => dispatch(toggleComplete(todo.id))}/> {/*// Мой локальный статус*/}
                        <span>{todo.title}</span>
                        <button onClick={() => dispatch(deleteTodo(todo.id))} >X</button> {/*Удаление из сервера*/}

                        {/* <button onClick={() => dispatch(removeLastTodo(todo))} >X</button>*/} {/*// Удаление из моего массива*/}
                    </li>
                )}

            </ul>
        </div>
    );
}

export default Todo;