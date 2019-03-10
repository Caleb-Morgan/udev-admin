import styled from 'styled-components';
import logo from '../../static/logo.png';

export const Icon = styled.div`
    position: absolute;
    right: 5px;
    top: 5px;
    border-radius: 50%;
    padding: 5px;
    &.active{
        background: #ccc;
    }
`

export const Headerbox = styled.div`
    max-width:1366px;
    height: 56px;
    border-bottom: 1px solid #eee;
    margin: auto;
`

export const Logo = styled.div`
    float: left;
    width: 100px;
    height: 56px;
    margin-right:100px;
    background: url(${logo});
    background-size:  100%;
    cursor: pointer;
`

export const Nav = styled.div`
`

export const NavItem = styled.div`
    color: #999;
    padding: 20px;
    cursor: pointer;
    &.left{
        float:left;
    }
    &.right{
        float: right;
    }
    &.search{
        padding: 0;
        margin-left:10px;
    }
    :hover{
        background: #eee;
    }
    &.search:hover{
        background: #fff;
    }
`
export const Account = styled.div`
    float:right;
    padding-right: 20px;
`
export const Button = styled.div`
    float: left;
    height: 38px;
    line-height: 26px;
    margin-top: 9px;
    padding: 5px 20px;
    border-radius: 19px;
    box-sizing: border-box;
    border: 1px solid rgba(236, 97, 73, 0.7);
    &.reg{
        color:#ec6149;
        margin-right: 10px;
    }
    &.rog{
        background: #ec6149;
        color: #fff;
    }
`
export const SearchWrapper = styled.div`
    position: relative;
    clear: both;
    height:38px;
    background: #eee;
    margin-top: 9px;
    border-radius: 19px;
    transition: width 0.6s ease-out;
    z-index: 10000;
    &.active{
        width: 240px;
    }
    .slide-enter{
        transition: all .6s ease-out;
    }
    .slide-enter-active{
        width: 240px;
    }
    .slide-exit{
        transition: all .6s ease-out;
    }
    .slide-exit-active{
        width:  160px;
    } 
`

export const Search = styled.input.attrs(
    { placeholder: '搜索' }
)`
    background: #eee;
    width: 160px;
    height: 36px;
    border: none;
    border-radius: 19px;
    padding: 0 30px 0 20px; 
    box-sizing: border-box;
    outline: none;
    transition: width 0.6s ease-out;
    &::placeholder{
        color:#999;
    }
    &.active{
        width: 240px;
    }
`

export const SearchInfo = styled.div`
    position: absolute;
    top: 48px;
    background: #fff;
    width: 280px;
    padding: 15px 15px 0 15px;
    border: 1px solid #eee;
    border-radius: 5px;
    box-shadow: 2px 2px 5px 2px  #eee;
    ::after{
        content: '';
        position: absolute;
        top: -20px;
        left: 20px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-bottom-color: #eee;
    }
`
export const SearchInfoTitle = styled.div`
    position: relative;
    height: 30px;
    font-size: 14px;
`
export const SearchInfoSwitch = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    font-size: 12px;
    cursor:  pointer;
`
export const SearchInfoItem = styled.div`
    float: left;
    margin:0 10px 10px 0; 
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 10px;    
`
export const TopBtn = styled.div`
    position: fixed;
    bottom: 50px;
    right: 30px;
    cursor: pointer;
    &.iconfont{
        font-size: 2.5rem;
        color: #666;
    }
`