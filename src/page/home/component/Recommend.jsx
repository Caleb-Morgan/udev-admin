import React, { Component } from 'react';
import { Board } from '../style.js';
class Recommend extends Component{
    render(){
        return(
            <Board>
                <a href="http://www.baidu.com">
                    <img src={'./banner-s-3.png'} alt="test"></img>
                </a>
                <a href="http://www.baidu.com">
                    <img src={'./banner-s-4.png'} alt="test"></img>
                </a>
                <a href="http://www.baidu.com">
                    <img src={'./banner-s-7.png'} alt="test"></img>
                </a>
                <a href="http://www.baidu.com">
                    <img src={'./banner-s-5.png'} alt="test"></img>
                </a>
                <a href="http://www.baidu.com">
                    <img src={'./banner-s-6.png'} alt="test"></img>
                </a>
            </Board>
        )
    }
}
export default  Recommend;
