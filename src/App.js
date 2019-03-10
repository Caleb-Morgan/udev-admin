import React, { Component } from 'react';
import Header from './common/header';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './page/home';
import Detail from './page/detail';
import Login from './page/login';
import { Headerbox } from './style';

class App extends Component{
    render(){
        return(
            <Provider store={ store }>
                <BrowserRouter>
                <div>
                    <Headerbox><Header/></Headerbox>
                    <Route path="/" exact component={ Home }></Route>
                    <Route path="/detail" exact component={ Detail }></Route>
                    <Route path="/login" exact component={ Login }></Route>
                </div>
                </BrowserRouter>
            </Provider>
        )
    }
}

export default App;
