import logo from './logo.svg';
import './App.css';
import Count from "./components/count";
import Todo from "./components/todo";
import s from "./components/todo.module.css";
import {useSelector} from "react-redux";

function App() {
    const {status,error} = useSelector(state => state.todo)
  return (
    <div className="App">
     <div>
       <Count/>
     </div>
        <br/>
        {status === 'Loading' && <h2>Loading...</h2>}
        {error && <h2>An error: {error}</h2>}
      <div>
        <Todo className={s.input}/>
      </div>
    </div>
  );
}

export default App;
