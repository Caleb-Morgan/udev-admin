import { CHANGE_INPUT_VALUE, ADD_LIST, DELETE_LIST, INIT_LIST} from './actionType'

//设置默认值
const defaultState = {
    inputValue: '',
    placeHolder: '请输入',
    list: []
}

//纯函数如果给固定输入一定会给固定输出，而且不会有任何副作用
export default (state = defaultState, action) =>{
    let newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case CHANGE_INPUT_VALUE:
        newState.inputValue = action.value;
        break;
        case ADD_LIST:
        const ck = newState.list.filter(
            (item)=>{
                if(item === action.value){
                    return item;
                }
                return false;
            }
            )
        if(ck.length<=0){
            newState.list.push(action.value);
        }else{
            action.info('该项已存在！！！')
        }
        
        newState.inputValue = '';
        break;
        case DELETE_LIST:
        newState.list.splice(action.index, 1);
        break;
        case INIT_LIST:
        newState.list = action.data;
        break;
        default:
        break;
    }
    state = newState;
    return state
}