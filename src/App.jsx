import {useEffect, useReducer} from 'react'
import './App.css'
import Header from "./components/Header.jsx";
import MainComponent from "./components/MainComponent.jsx";
import Loader from "./components/Loader.jsx";
import Error from "./components/Error.jsx";
import StartScreen from "./components/StartScreen.jsx";
import Question from "./components/Question.jsx";
import NextButton from "./components/NextButton.jsx";
import Progress from "./components/Progress.jsx";
import FinishScreen from "./components/FinishScreen.jsx";

const initialState = {
    questions: [],
    // 'loading', 'error', 'ready', 'active', 'finished'
    status: 'loading',
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
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

        case 'start':
            return {
                ...state,
                status: 'active',
            }
        case 'newAnswer':
            const question = state.questions.at(state.index);

            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points,
            }
        case 'nextQuestion':
            return {
                ...state,
                index: state.index + 1,
                answer: null,
            }
        case 'finish':
            return {
                ...state,
                status: 'finished',
                highscore: state.points > state.highscore ? state.points : state.highscore,
            }
        case 'restart':
            return {
                ...initialState, questions: state.questions, status: "ready",
            }
        default:
            throw new Error('Action unknown');
    }
}

function App() {
    const [{questions, status, index, answer, points, highscore}, dispatch] = useReducer(reducer, initialState);

    const numQuestions = questions.length;
    const maxPossiblePoints = questions.reduce((previous, current) => previous + current.points, 0)

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
                    {status === 'ready' && <StartScreen numQuestions={numQuestions}
                                                        dispatch={dispatch}/>}
                    {status === 'active' &&
                        <>
                            <Progress index={index}
                                      numQuestion={numQuestions}
                                      points={points}
                                      maxPossiblePoints={maxPossiblePoints}
                                      answer={answer}/>
                            <Question question={questions[index]}
                                      dispatch={dispatch}
                                      answer={answer}/>
                            <NextButton dispatch={dispatch}
                                        answer={answer}
                                        index={index}
                                        numQuestions={numQuestions}/>
                        </>
                    }
                    {status === 'finished' && <FinishScreen points={points}
                                                            maxPossiblePoints={maxPossiblePoints}
                                                            highscore={highscore}
                                                            dispatch={dispatch}/>}
                </MainComponent>
            </div>
        </>
    )
}

export default App
