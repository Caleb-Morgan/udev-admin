import React, { Component } from 'react';
import Header from './common/header';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './page/home';
import Detail from './page/detail';
import { Headerbox } from './style';

class App extends Component{
    render(){
        return(
            <Provider store={ store }>
                <div>
                    <Headerbox><Header/></Headerbox>
                    <BrowserRouter>
                    <div>
                        <Route path="/" exact component={ Home }></Route>
                        <Route path="/detail" exact component={ Detail }></Route>
                    </div>
                    </BrowserRouter>
                </div>
                
            </Provider>
        )
    }
}

export default App;
