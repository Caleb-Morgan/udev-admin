import { takeEvery, put} from 'redux-saga/effects';
import { GET_INIT_LIST } from './actionType';
import { appendList } from './acitonCreater'
import axios from 'axios';

function* initList(){
    const res = yield axios('http://127.0.0.1:9527/api/list');
    const action = yield appendList(res.data.body);
    yield put(action);

}

function* mySaga(){
    yield takeEvery(GET_INIT_LIST, initList);
}

export default mySaga;