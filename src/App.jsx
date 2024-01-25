import {useEffect, useReducer} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainComponent from "./components/MainComponent.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
};

function reducer(state, action) {
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready'
            }
        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            }
        default:
            throw new Error('Action unknown');
    }
}

function App() {
    const [{questions, status}, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;

    useEffect(() => {
        async function DataFecthing() {
            try {
                const resp = await fetch(`http://localhost:8000/questions`);
                const data = await resp.json();
                dispatch({type: 'dataReceived', payload: data})
            } catch (error) {
                dispatch({type: 'dataFailed'});
            } finally {
                console.log(`All happened correctly!`)
            }
        }

        DataFecthing();
    }, []);

    return (
        <>
            <div className='app'>
                <Header/>

                <MainComponent>
                    {status === 'loading' && <Loader/>}
                    {status === 'error' && <Error/>}
                    {status === 'ready' && <StartScreen numQuestions={numQuestions}/>}
                </MainComponent>
            </div>
        </>
    )
}

export default App
