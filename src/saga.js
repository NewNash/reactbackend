import {all,put,takeEvery,call} from 'redux-saga/effects'

import axios from 'axios'

function* login(){
    yield takeEvery('saga-login',logindata)
}
function* logindata(action) {
    let data
    yield axios({
        method:'post',
        url:'http://127.0.0.1:3001/login',
        transformRequest:(data)=>JSON.stringify(data),
        data:{username:action.text.username,password:action.text.password}
    })

    yield put({type:'login',text:data})
}
export default function* rootsaga(){
    yield all([
        login()
    ])
}