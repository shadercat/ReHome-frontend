import React, {Suspense} from 'react';
import './App.css';
import './styles/styles.css';
import {createStore, combineReducers} from 'redux';
import * as reducers from './reducers';
import {Provider} from 'react-redux';
import Loader from './components/Loader';
import Main from './components/Main';

const reducer = combineReducers(reducers);
const store = createStore(reducer);

function App() {
    return (
        <Provider store={store}>
            <Suspense fallback={<Loader/>}>
                <Main/>
            </Suspense>
        </Provider>
    );
}

export default App;
