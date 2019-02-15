import  header from '../common/header/store';
import home from '../page/home/store';
import { combineReducers } from 'redux-immutable';

export default combineReducers({
    header: header,
    home: home
})