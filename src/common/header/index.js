import React, { Component } from 'react';
import { 
    Headerbox, 
    Logo, 
    Nav, 
    NavItem, 
    Account, 
    Button, 
    SearchWrapper,
    Icon, 
    Search, 
    SearchInfo, 
    SearchInfoTitle, 
    SearchInfoSwitch, 
    SearchInfoItem,
    TopBtn } from './style';
import { CSSTransition } from  'react-transition-group';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import *as creaters from './store/actionCreater';


class Header extends Component{
    componentDidMount(){
        this.props.bindEvent()
    }
    searchInfo(focused, mouseIn){

        if(focused  || mouseIn){
            const {handelMouseEnter, handelMouseLeave, list, page,  totalPage, changeList} = this.props;
            let pageList = [];
            const newlist = list.toJS();
            for(let i = (page-1)*10; i<page*10; i++){
                if(newlist[i]){
                    pageList.push(<SearchInfoItem key={newlist[i]}>{newlist[i]}</SearchInfoItem>);
                }
            }
            return(
                <SearchInfo onMouseEnter={handelMouseEnter} onMouseLeave={handelMouseLeave}>
                    <SearchInfoTitle>
                        热门搜索
                        <SearchInfoSwitch onClick={ () => { changeList(page, totalPage)}}>换一批</SearchInfoSwitch>
                    </SearchInfoTitle>
                    <div>
                        {pageList}
                    </div>
                </SearchInfo>
            )
        }
    }    
    render(){
        const { focused, mouseIn, searchBlur, searchFoucus, toTop, list, showScroll}  = this.props;
        return(
            <Headerbox>
                <Link to="/">
                    <Logo></Logo>
                </Link>
                <Nav>
                    <NavItem className="left icon iconfont">&#xe780;发现</NavItem>
                    <NavItem className="left">下载APP</NavItem>
                    <NavItem className="left search">
                        <SearchWrapper>
                            <CSSTransition
                                in={ focused }
                                classNames="slide"
                                timeout={600}
                            >
                                <Search className={ focused?'active':''} onBlur ={  searchBlur } onFocus={ () => { searchFoucus(list)}}/>
                            </CSSTransition>
                            <Icon className={ focused?'active':''}><i className="iconfont">&#xe9a2;</i></Icon>
                            {this.searchInfo( focused, mouseIn)}
                        </SearchWrapper>
                        
                    </NavItem>
                    
                    <Account>
                        <Button className="reg">注册</Button>
                        <Button className="rog"><i className="iconfont">&#xe7a6;</i>写文章</Button>
                    </Account>
                    <NavItem className="right">登录</NavItem>
                    <NavItem className="right">Aa</NavItem>
                </Nav>
                {showScroll ? <TopBtn className="iconfont" onClick = {toTop}>&#xe7b8;</TopBtn> : null}
                  
            </Headerbox>
        )
        }
}

const mapStateToProps = (state) =>{
    return{
        focused:  state.getIn(['header', 'focused']),
        mouseIn: state.getIn(['header', 'mouseIn']),
        page: state.getIn(['header', 'page']),
        totalPage: state.getIn(['header', 'totalPage']),
        list: state.getIn(['header', 'list']),
        showScroll: state.getIn(['header', 'showScroll'])
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        searchBlur(){
            dispatch(creaters.search_blur())
        },
        searchFoucus(list){
            if(list.size === 0){
                dispatch(creaters.axois_hot())
            }
            dispatch(creaters.search_focus())
        },
        handelMouseEnter(){
            dispatch(creaters.handel_enter())
        },
        handelMouseLeave(){
            dispatch(creaters.handel_leave())
        },
        changeList(page, totalPage){
            if(page < totalPage){
                dispatch(creaters.change_page(page + 1))
            }else{
                dispatch(creaters.change_page(1))
            }
        },
        toTop(){
            window.scrollTo(0, 0);
        },
        bindEvent(){
            window.addEventListener('scroll', () => {
                if(document.documentElement.scrollTop > 200){
                    dispatch(creaters.show_scroll(true))
                }else{
                    dispatch(creaters.show_scroll(false))
                }
            })
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);