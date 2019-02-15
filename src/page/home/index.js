import React, { Component } from 'react';
import  { HomeWrapper, HomeLeft, HomeRight } from './style';
import List from './component/List';
import Topic from './component/Topic';
import Author from './component/Author';
import Recommend from './component/Recommend';
import Carousel from './component/Carousel/Carousel';
import data from './component/Carousel/data.json'

class Home extends Component{
    render(){
        data["lunboObject"] = {
            "interval": 1000,
            "direction": "right",
            "number": 3,
            "boxStyle": "content",
            "imgWidth": 625,
            "imgHeight": 270
        }
        return(
            <HomeWrapper>
                <HomeLeft>
                    <Carousel lunboObject={data.lunboObject} imgArray={data.imgArray} linkArray={data.linkArray}></Carousel>
                    <List></List>
                </HomeLeft>
                <HomeRight>
                    <Recommend></Recommend>
                    <Topic></Topic>
                    <Author></Author>
                </HomeRight>
            </HomeWrapper>
        )
    }
}

export default Home;