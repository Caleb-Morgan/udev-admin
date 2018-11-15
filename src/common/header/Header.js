import React, { Component } from 'react';
import { HraderWrapper, Nav, Logo, NavItem, Addition, Button, SearchWrapper, Icon, Search } from './style';

class Header extends Component{
    render(){
        return(
            <HraderWrapper>
                <Nav>
                    <Logo/>
                    <NavItem className="left active"><i className="iconfont">&#xe786;</i>首页</NavItem>
                    <NavItem className="left"><i className="iconfont">&#xe60f;</i>下载App</NavItem>
                    <SearchWrapper className="active">
                        <Search className="active"></Search>
                        <Icon className="active"><i className="iconfont">&#xe616;</i></Icon>
                    </SearchWrapper>
                    <Addition>
                        <Button className="reg">注册</Button>
                        <Button className="wri"><i className="iconfont">&#xe600;</i>写文章</Button>
                    </Addition>
                    <NavItem className="right">登录</NavItem>
                    <NavItem className="right"><i className="iconfont">&#xe636;</i></NavItem>
                    
                </Nav>
                
            </HraderWrapper>
        )
    }
}

export default Header;