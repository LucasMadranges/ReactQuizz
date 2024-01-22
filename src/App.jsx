import {useState} from 'react'
import './App.css'
import DateCounter from "./DateCounter.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <DateCounter/>
        </>
    )
}

export default App
