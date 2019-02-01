import React, { Component } from 'react';
import { CarouselWrapper } from './style';
//import { CSSTransition, TransitionGroup } from 'react-transition-group';
class Carousel extends Component{
    constructor(props){
        super(props)
        this.state = {
            activeIndex:1,
            offsetDistance:this.props.lunboObject.direction === 'right' || this.props.lunboObject.direction === 'left' ? -this.props.lunboObject.imgWidth : -this.props.lunboObject.imgHeight,
            pause:false,
            flag:true
        }
        this.mouseHandle = this.mouseHandle.bind(this)
        this.playRight = this.playRight.bind(this)
        this.playLeft = this.playLeft.bind(this)
        this.right = this.right.bind(this)
        this.left = this.left.bind(this)
    }
    componentWillMount(){
        this.direction = this.props.lunboObject.direction === 'left' || this.props.lunboObject.direction === 'right'? 'x' : 'y';
    }
    componentDidMount(){
        this.autoPlay();
    }
    componentWillUnmount(){
        clearTimeout(this.timeOuter);
        clearInterval(this.timer);
    }
    autoPlay(){
        switch(this.props.lunboObject.direction){
            case 'right' : 
                this.timerOuter=setTimeout(this.playRight,this.props.lunboObject.interval);
                this.direction='x';
                break;
            case 'left'  : 
                this.timerOuter=setTimeout(this.playLeft,this.props.lunboObject.interval);
                this.direction='x';
                break;
            case 'top'   : 
                this.timerOuter=setTimeout(this.playLeft,this.props.lunboObject.interval);
                this.direction='y';
                break;
            case 'bottom': 
                this.timerOuter=setTimeout(this.playRight,this.props.lunboObject.interval);
                this.direction='y';
                break;
            default:
            break;
            };
    }
    directionHandle (){
        if(this.direction === 'y'){
            return {top : this.state.offsetDistance+'px',width : this.props.lunboObject.imgWidth,height : this.props.lunboObject.imgHeight*(this.props.lunboObject.number+2)};
        }else {
            return {left : this.state.offsetDistance+'px',width : this.props.lunboObject.imgWidth*(this.props.lunboObject.number+2),height : this.props.lunboObject.imgHeight};
        }
    }
    mouseHandle (e){
        if(e.type === 'mouseover'){
            this.setState({pause : true});
        }else if(e.type === 'mouseleave'){
            this.setState({pause : false});
            this.autoPlay();
        }
    }
    checkDots (index){
        var activeIndex;
        if(this.state.activeIndex === this.props.lunboObject.number+1){
            activeIndex = 1;
        }else if(this.state.activeIndex === 0){
            activeIndex = this.props.lunboObject.number;
        }else {
            activeIndex = this.state.activeIndex;
        }
        return index+1 === activeIndex? 'dots active' : 'dots';
    }
    dotsHover (index){
        clearInterval(this.timer);
        this.setState({activeIndex:index+1});
        this.position();
    }
    playRight(indexIn){
        if(this.state.flag){
            var index=indexIn?indexIn:this.state.activeIndex+1;
            this.setState({activeIndex:index});
            this.position();
        }
    }
    playLeft(indexIn){
        if(this.state.flag){
            var index=indexIn?indexIn:this.state.activeIndex-1;
            this.setState({activeIndex:index});
            this.position();
        }
    }
    position(){
        this.setState({flag:false});
        this.timer = setInterval(function(){
            var boxDistance = '';
            if(this.direction === 'x'){
                boxDistance = this.props.lunboObject.imgWidth;
            }else {
                boxDistance = this.props.lunboObject.imgHeight;
            }
            var offsetDistance = this.state.offsetDistance;
            if(Math.abs(offsetDistance-(-boxDistance*this.state.activeIndex)) <= 0.09){
                offsetDistance = -boxDistance*this.state.activeIndex;
                clearInterval(this.timer);
                this.setState({flag:true});
                if(this.state.activeIndex > this.props.lunboObject.number){
                    offsetDistance = -boxDistance;
                    this.setState({activeIndex : 1});
                }else if(this.state.activeIndex === 0){
                    offsetDistance = -boxDistance*this.props.lunboObject.number;
                    this.setState({activeIndex : this.props.lunboObject.number});
                }
                this.setState({offsetDistance:offsetDistance});
                if(!this.state.pause){
                    this.autoPlay();
                }
            }else{
                offsetDistance = offsetDistance-(boxDistance*this.state.activeIndex-Math.abs(offsetDistance))/30;
                this.setState({offsetDistance:offsetDistance});
            }
        }.bind(this),10);
    }
    left(){
        var oldIndex=this.state.activeIndex;
        this.playLeft(oldIndex-1);
    }
    right(){
        var oldIndex=this.state.activeIndex;
        this.playRight(oldIndex+1);
    }
    render(){
        var _this = this;
        return(
            <CarouselWrapper style={{width:this.props.lunboObject.imgWidth, height:this.props.lunboObject.imgHeight}} onMouseOver={this.mouseHandle} onMouseLeave={this.mouseHandle}>
            <span className="leftIcon icon iconfont" onClick={this.left}>&#xe857;</span>
            <span className="rightIcon icon iconfont" onClick={this.right}>&#xe856;</span>
            <div className="dots-wrap">
                {   
                    React.Children.map(this.props.children,function(elem,index){
                        return (<span className={_this.checkDots(index)} onMouseOver={_this.dotsHover.bind(_this,index)}></span>);
                    })
                }
            </div>
            <ul style={this.directionHandle()}>
                <li key={this.props.lunboObject.number-1}><a href={this.props.linkArray[this.props.lunboObject.number-1]}><img width={this.props.lunboObject.imgWidth} height={this.props.lunboObject.imgHeight} src={this.props.imgArray[this.props.lunboObject.number-1]} alt="empty"/></a></li>
                {    
                    this.props.imgArray.map(function(item,index){
                        return <li key={index}><a href={this.props.linkArray[index]}><img width={this.props.lunboObject.imgWidth} height={this.props.lunboObject.imgHeight} src={item} alt="empty"/></a></li>;
                    }.bind(this))
                }
                <li key={0}><a href={this.props.linkArray[0]}><img width={this.props.lunboObject.imgWidth} height={this.props.lunboObject.imgHeight} src={this.props.imgArray[0]} alt="empty"/></a></li>
            </ul>
        </CarouselWrapper>
        )
    }
}

Carousel.defaultProps = {
    direction:'right',
    interval: 1000,
    boxStyle:'content'
}

export default Carousel;