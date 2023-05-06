import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {v1} from 'uuid';


// createAsyncThunk - Аналог Thunk Creator
export const fetchTodos = createAsyncThunk ( // Получение списка пользователей
    'todos/fetchTodos', // Тип , имя .
    // Вариант 1
   async  function(_,{rejectWithValue}) { // rejectWithValue - содержит ошибку
       try {
       const response = await fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
       if (!response.ok) {
           throw new Error('Server error');
       }
       const data = await response.json();
       return data;
   } catch (error) {
           return rejectWithValue(error.message)
       }
    },
    // Вариант 2
   /* async function () {
            const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
            return  response.data
    }*/
);
// Удаление постов на сервере
export const deleteTodo = createAsyncThunk (
    'todos/deleteTodo',
    async  function(id,{rejectWithValue,dispatch}) {
        try {
            const response = await  fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, { method: 'DELETE'})

            if(!response.ok) {
                throw new Error('Can\'t delete')
            }
            dispatch(removeLastTodo({id}));
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
// Изменение статуса на сервере
export const toggleStatus = createAsyncThunk(
    'todos/toggleStatus',
    async function(id,{rejectWithValue, dispatch, getState}){
        const todo = getState().todos.todos.find( todo => todo.id === id)
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: 'PATCH',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({completed: !todo.completed})
            })
            if(!response.ok) {
                throw new Error('Can\'t toggle')
            }
            const  data = await  response.json();
            console.log(data)
        } catch (error) {
            return rejectWithValue(error.message)
        }
    }
);
// Отправляет мой пост/задачу на сервер
// Диспачит пришедший ответ в мои посты
export  const addNewToto = createAsyncThunk(
    'todos/addNewTodos',
    async function(text,{rejectWithValue,dispatch}) {
        try {
            console.log(text)
            const todo = {
               // id: new Date().getTime(),
                title: text,
                userId: 111,
                completed: false,
            };
            const  response = await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                headers: {'Content-Type': 'application/json',},
                body: JSON.stringify(todo)
            });
            if(!response.ok) {
                throw new Error('NE todo')
            }
            const data = await  response.json()
            dispatch(addTodo(data))
            console.log(data)

        }  catch (error) {
            return rejectWithValue(error.message)
        }
    }
);

const todoSlice = createSlice({ //Аналог Reducer

    name: 'todo',
    initialState: {
        status: null,
        error: null,
        todos:[{id:1, title: 'todo', completed: false,},{id:2, title: 'hello', completed: false,}],
    },

// Аналог ActionCreator
    reducers:{
        // Мой. Локально додает задачу
      /*  addTodo(state, action) {
            state.todos.push({
                id: new Date().getTime(),
             title: action.payload
            })
        },*/
        addTodo(state, action) { // Добавляет задачу в список которую я написал и отправил на сервер
            state.todos.push(action.payload)
        },
        removeLastTodo(state,action) {
          /*  let i = state.todos.task.indexOf(action.payload.task);
            if(i >= 0) {
            state.todo = state.todos.splice(i,1);
            }*/
          state.todos = state.todos.filter(e => e.id != action.payload.id);
        },
        toggleComplete(state, action) {
            let userId = state.todos.find(item => item.id == action.payload);
           // console.log(state.todos.id[action.payload]

          if(userId.completed) {
              userId.completed = false
          }  else {
              userId.completed = true
          }
        },

    },
    extraReducers:{ // Обработка Thunk Creator
        // Когда идет загрузка
        [fetchTodos.pending]: (state,action)=> {
            state.status = 'Loading';
            state.error = null
        },
        // когда загрузился удачно
        [fetchTodos.fulfilled]: (state,action)=> {
            state.status = ' Resolved ';
            state.todos = action.payload;
        },
        // Когда ошибка
        [fetchTodos.rejected]: (state,action)=> {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [deleteTodo.rejected]: (state,action)=> {
            state.status = 'rejected';
            state.error = action.payload;
        },

    }
});


export default todoSlice.reducer;
export const {addTodo, removeLastTodo,toggleComplete} = todoSlice.actions