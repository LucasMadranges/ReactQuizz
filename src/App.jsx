import {useState} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainComponent from "./components/MainComponent.jsx";

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <div className='app'>
                <Header/>

                <MainComponent>
                    <p>1/15</p>
                    <p>Question?</p>
                </MainComponent>
            </div>
        </>
    )
}

export default App
