import React, { Component } from 'react';
import { Down } from '../style.js';
import { connect } from 'react-redux';
import *as creaters from '../store/actionCreater';
class Topic extends Component{
    render(){
        const { isActive, showPopover, hidePopover } = this.props;
        return(
            <Down onMouseOver={showPopover} onMouseLeave={hidePopover}>
                <img src="./download.png" alt="test"/>
                <div className="info">
                    <div className="title">下载简书手机APP <i className="icon iconfont">&#xe856;</i></div>
                    <div className="description">随时随地发现和创作内容</div>
                </div>
                <div className={ isActive ? "popover active":"popover" }>
                    <img src="./download.png" alt="test"/>
                    <div className="arrow"></div>
                </div>
            </Down>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        isActive: state.getIn(['home', 'isActive'])
    }
}

const mapDisplatchToprops = (displatch) =>{
    return {
        showPopover(){
            displatch(creaters.show_popover())
        },
        hidePopover(){
            displatch(creaters.hide_popover())
        }
    }
}

export default  connect(mapStateToProps, mapDisplatchToprops)(Topic);
