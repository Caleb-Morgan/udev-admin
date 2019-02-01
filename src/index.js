import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './style';
import { Iconfont } from './static/iconfont';

var system = (
    <div>
        <GlobalStyle/>
        <Iconfont/>
        <App/>
    </div>
)

ReactDOM.render(system, document.getElementById('root'));

