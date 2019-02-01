import styled from 'styled-components';

export const CarouselWrapper = styled.div`
    position: relative;
    width: 625px;
    overflow: hidden;
    border-radius: 5px;
    img{
        vertical-align: top;
    }
    .leftIcon{
        position: absolute;
        display: inline-block;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 0px;
        margin-top:-25px;
        font-size: 2rem;
        line-height: 50px;
        text-align: center;
        z-index: 999;
        cursor: pointer;
        color:#fff;
        background: rgba(0, 0, 0, 0.5);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    .rightIcon{
        position: absolute;
        display: inline-block;
        width: 50px;
        height: 50px;
        top: 50%;
        right: 0px;
        margin-top:-25px;
        font-size: 2rem;
        line-height: 50px;
        text-align: center;
        z-index: 999;
        cursor: pointer;
        color:#fff;
        background: rgba(0, 0, 0, 0.5);
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }
    .dots-wrap{

    }
    li {
        float: left;
        margin: 0;
        padding: 0;
        font-size: 12px;
    }

    ul {
        margin: 0;
        padding: 0;
        list-style: none;
        position: relative;
    }
    .dots {
        display: block;
        width: 16px;
        height: 16px;
        background: #eee;
        border-radius: 8px;
        margin-right: 8px;
        float: left;
        cursor: pointer;
    }
    .dots.active {
        background: #000;
    }
    .dots-wrap {
        overflow: hidden;
        position: absolute;
        z-index: 99;
        bottom: 10px;
        right: 20px;
    }
`