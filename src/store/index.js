import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import reducer from './reducer';
import mySaga from './saga';

const composeEnhancers = 
typeof window === 'object' && 
window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE__() : compose;

const sagaMiddleware = createSagaMiddleware();

const enhancers = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

const store = createStore(
    reducer,
    enhancers
    /* window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() */
    );
sagaMiddleware.run(mySaga);

export default store;