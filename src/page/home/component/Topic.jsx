import React, { Component } from 'react';
import { Down } from '../style.js';
class Topic extends Component{
    render(){
        return(
            <Down>
                <img src="./download.png" alt="test"/>
                <div className="info">
                    <div className="title">下载简书手机APP <i className="icon iconfont">&#xe856;</i></div>
                    <div className="description">随时随地发现和创作内容</div>
                </div>
                <div className="popover">
                    <img src="./download.png" alt="test"/>
                    <div className="arrow"></div>
                </div>
            </Down>
        )
    }
}
export default  Topic;
