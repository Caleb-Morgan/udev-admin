import styled from "styled-components";
import logo from "../../static/logo.png";

export const HraderWrapper = styled.div`
  height: 56px;
  border-bottom: 1px solid #ccc;
`;

export const Nav = styled.div`
  position: relative;
  height: 56px;
  max-width: 1440px;
  min-width: 768px;
  margin: auto;
`;

export const Logo = styled.div`
  float: left;
  width: 100px;
  height: 56px;
  margin-right: 80px;
  background: url(${logo});
  background-size: 100%;
`;
export const NavItem = styled.div`
  padding: 15px;
  font-size: 17px;
  line-height: 26px;
  &.left {
    float: left;
  }
  &.right {
    float: right;
    color: #999;
  }
  &.active {
    color: #ed6f7f;
  }
  &.iconfont {
    font-size: 28px;
  }
`;
export const Addition = styled.div`
  float: right;
  height: 56px;
`;
export const Button = styled.div`
  float: left;
  line-height: 35px;
  margin-top: 9px;
  margin-right: 20px;
  padding: 0 20px;
  box-sizing: border-box;
  border-radius: 19px;
  border: 1px solid rgba(236, 97, 73, 0.7);
  &.reg {
    color: #ea6f5a;
  }
  &.wri {
    color: #fff;
    background: #ea6f5a;
  }
`;

export const SearchWrapper = styled.div`
  background: #eee;
  float: left;
  width: 180px;
  height: 40px;
  margin-top: 8px;
  box-sizing: border-box;
  border: 1px solid #eee;
  border-radius: 19px;
  outline: none;
  display: flex;
  &.active{
    width: 240px;
  }
`;

export const Search = styled.input.attrs({
    placeholder: '输入'
  })`
  float:left;
  width: 135px;
  height: 30px;
  margin-top: 5px;
  padding: 0 20px;
  display:block;
  color: #666;
  border:none;
  outline: none;
  background: none;
  &::placeholder{
    color:#ccc;
  }
  &.active{
    width: 195px;
  }
`

export const Icon = styled.div`
  float: right;
  width: 30px;
  height: 30px;
  padding: 5px;
  box-sizing: border-box;
  border-radius: 50%;
  &.active{
    background: #969696;
  }
`;
