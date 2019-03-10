import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { ListWrapper, ListItem, ItemLeft, ItemRight, More } from '../style.js';
import Logo from '../../../static/logo.png';
import { connect } from 'react-redux';
import *as creaters from '../store/actionCreater';
class List extends Component{
    componentDidMount(){
        this.props.getItem();
    }
    render(){
        let itemlist = [];
        this.props.articleItem.toJS().map((item, index) =>{
            const {title, introduction, author, authorurl, messageurl, messagenum, like} = item;
            return itemlist.push(<ListItem key={index}>
                <ItemLeft>
                    <div className="title"><Link to='/detail'>{title}</Link></div>
                    <div className="introduction">{introduction}</div>
                    <div className="meta">
                        <a href={authorurl}>{author}</a>
                        <a href={messageurl}>
                            <i className="icon iconfont">&#xe79d;</i>
                            {messagenum}
                        </a>
                        <span>
                            <i className="icon iconfont">&#xe8b4;</i>
                            {like}
                        </span>
                    </div>
                </ItemLeft>
                <ItemRight>
                    <img src={Logo} alt="name" />
                </ItemRight>
            </ListItem>)
        })
        return(
            <ListWrapper>
                {itemlist}
                <More href="http://www.baidu.com">阅读更多</More>
            </ListWrapper>
        )
    }
}

const mapStateToProps = (state) =>{
    return {
        articleItem: state.getIn(['home', 'articleItem'])
    }
}

const mapDisplatchToProps = (displatch) =>{
    return{
        getItem(){
            displatch(creaters.axios_article())
        }
    }
}

export default connect(mapStateToProps, mapDisplatchToProps)(List);