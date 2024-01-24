import {useState} from 'react'
import './App.css'
import Header from "./Header.jsx";
import MainComponent from "./MainComponent.jsx";

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
