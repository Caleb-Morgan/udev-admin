import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { GlobalStyle } from './style';
import { Iconfont } from './static/iconfont/iconfont';


const root = (
    <div>
        <GlobalStyle/>
        <Iconfont/>
        <App/>
    </div>
)

ReactDOM.render(root, document.getElementById('root'));


