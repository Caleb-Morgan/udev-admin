import styled from 'styled-components';

export const HomeWrapper = styled.div `
    width: 960px;
    overflow: hidden;
    margin: 0 auto;
`
export const HomeLeft = styled.div `
    float: left;
    margin-left: 15px;
    margin-top: 90px;
    width: 625px;
`

export const HomeRight = styled.div `
    float: right;
    width: 280px;
    margin-top: 90px;
`
/* list css start */
export const ListWrapper = styled.div `
    margin-top: 30px;
`
export const ListItem = styled.div `
    position: relative;
    border-top: 1px solid #eee;
`
export const ItemLeft = styled.div `
    padding: 30px 0 20px 0;
    padding-right: 150px;
    .title{
        font-weight: bold;
        margin-bottom: 20px;
    }
    .introduction{
        margin-bottom: 10px;
        font-weight:normal;
        color:#999;
        font-size:.8rem;
        line-height: 1.5rem;
    }
    .meta a, .meta span{
        margin-right: 10px;
        font-size:0.8rem;
        color: #999;
        text-decoration: none;
    }
    .meta a i, .meta span i{
        margin-right: 5px;
    }
`
export const ItemRight = styled.div `
    position: absolute;
    top: 50%;
    right: 0;
    width: 150px;
    height: 100px;
    margin-top: -50px;
    img{
        width: 150px;
    }
`
export const More = styled.a `
    display: block;
    width: 100%;
    padding: 13px;
    margin: 20px 0;
    text-align: center;
    background: #a5a5a5;
    border-radius: 20px;
    text-decoration: none;
    color: #fff;
    box-sizing: border-box;
    &&:hover{
        background: #999;
    }
`
/* list css end */

/* topic css start */
export const Board = styled.div `
    margin-top: -4px;
    padding-bottom: 4px;
    a{
        display:block;
    }
    img{
        display: block;
        width: 100%;
        margin-bottom: 6px;
    }
`

/* topic css end */

/* author css start */
export const AuthorWrapper = styled.div `
    margin-top: 30px;
`
export const Title = styled.div `
    position: relative;
    padding: 5px;
    margin-bottom: 20px;
    span{
        color: #aaa;
    }
    a{
        position: absolute;
        right: 0;
        text-decoration: none;
        color: #aaa;
    }
`
export const AuthorItem = styled.div `
    margin-bottom: 20px;
    position: relative;
    .avatar{
        float: left;
        width: 48px;
        height: 48px;
        margin-right: 10px;
        border-radius: 50%;
    }
    .avatar img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
    }
    .name{
        color: #000;
        text-decoration: none;
    }
    p{
        margin-top: 10px;
        font-size:.8rem;
        color:#aaa;
    }
    .follow{
        position: absolute;
        right: 0;
        color: #42c02e;
        text-decoration: none;
    }
`
export const Clear = styled.div `
    clear:both;
`
export const MoreAuthor = styled.a `
    display: block;
    width: 100%;
    padding: 8px;
    margin: 20px 0;
    text-align: center;
    border: 1px solid #dcdcdc;
    background: #f7f7f7;
    border-radius: 5px;
    text-decoration: none;
    color: #787878;
    box-sizing: border-box;
`
/* author css end */

/* Topic css start */
export const Down = styled.div `
    position: relative;
    border: 1px solid #ccc;
    padding: 10px 20px;
    cursor: pointer;
    img{
        width: 60px;
        height: 60px;
        vertical-align: middle;
    }
    .info{
        display: inline-block;
        margin-left: 8px;
        font-size: .8rem;
        color:#666;
        line-height: 1.2rem;
        vertical-align: middle;
    }
    .popover{
        position: absolute;
        top: -180px;
        left: 50%;
        margin-left: -85px;
        padding: 10px;
        width: 170px;
        height: 170px;
        background: #fff;
        border: 1px solid #ccc;
        border-radius: 10px;
        box-sizing: border-box;
    }
    .popover .arrow{
        position: absolute;
        bottom: -20px;
        right: 50%;
        margin-right: -10px;
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top-color: #eee;
    }
    .popover .arrow::after{
        position: absolute;
        bottom: -7px;
        right: 50%;
        margin-right: -10px;
        content: '';
        width: 0;
        height: 0;
        border: 10px solid transparent;
        border-top-color: #fff;
    }
    .popover img{
        width: 100%;
        height: 100%;
    }
`
/* Topic css end */