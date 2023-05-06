import React from 'react';
import {decrement, increment, reset} from "../store/Slice-count";
import {useDispatch, useSelector} from "react-redux";

function Count(props) {
    const count = useSelector( state => state.count.count)
    const dispatch = useDispatch()
    return (
        <div>
            <div>
                <div>
                Счетчик {count}
                </div>
                <button onClick={()=> dispatch( increment())}> + Плюс </button>
                <button onClick={()=> dispatch( decrement())}> - Минус </button>
                <button onClick={()=> dispatch( reset())}> Сброс </button>


            </div>

        </div>
    );
}

export default Count;