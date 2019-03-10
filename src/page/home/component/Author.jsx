import React, { Component } from 'react';
import { AuthorWrapper, Title, AuthorItem, Clear, MoreAuthor} from '../style';
import { connect } from 'react-redux';
import *as creaters from '../store/actionCreater';
class Author extends Component {
    componentDidMount(){
        this.props.get_list()
    }
    render() {
        let Authorlist = [];
        this.props.list.toJS().map((item, index) =>{
            return Authorlist.push(<AuthorItem key={index}>
                <a className="avatar" href="http://www.baidu.com">
                    <img src="./favicon.ico" alt="test"></img>
                </a>
                <a className="follow" href="http://www.baidu.com">
                    <i className="icon iconfont">&#xe88e;</i>
                    关注
                </a>
                <a className="name" href="http://www.baidu.com">{item.name}</a>
                <p>写了{item.word}字 · {item.like}喜欢</p>
                <Clear></Clear>
            </AuthorItem>)
        })
        return (
            <AuthorWrapper>
                <Title>
                    <span>推荐作者</span>
                    <a href="http://www.baidu.com"><i className="icon iconfont">&#xe797;</i>换一批</a>
                </Title>
                {Authorlist}
                <MoreAuthor href="http://ww.baidu.com">查看全部 <i className="icon iconfont">&#xe856;</i></MoreAuthor>
            </AuthorWrapper>
        )
    }
}

const mapStateToPtops = (state) =>{
    return{
        list:  state.getIn(['home', 'list']),
    }
}

const mapDisplatchToProps = (displatch) =>{
    return{
        get_list(){
            displatch(creaters.axios_list())
        }
    }
}

export default connect(mapStateToPtops, mapDisplatchToProps)(Author);