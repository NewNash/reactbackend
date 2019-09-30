import {all, put, takeEvery} from 'redux-saga/effects'

import axios from 'axios'

function* login() {
    yield takeEvery('saga-login', logindata)
}

function* logindata(action) {
    let data
    yield axios.post("http://127.0.0.1:3001/login", {
        username: action.text.username,
        password: action.text.password
    }).then((res) => {
        if (res.data === 'ok') {data = true}
        else {data = false}
    })
        .catch(error => console.log(error))
    yield put({type: 'login', text: data})
}

function* getContentAsync() {
    let data
    yield axios.get('https://neveralone.cn/api/articleInfo?id=5d8c623d0f2ae6058072063e').then((res)=>data = res.data[0])
    yield put({type:'content',text:data})
}
function* getContent(){
    yield takeEvery('getContent',getContentAsync)
}


function* getCategoryAsync() {
    let data
    yield axios.get('https://neveralone.cn/api/getCategory').then(res=>data=res.data)
    yield put({type:'category',text:data})
}
function* getCategory() {
    yield takeEvery('getCategory',getCategoryAsync)
}
export default function* rootsaga() {
    yield all([
        login(),
        getContent(),
        getCategory()
    ])
}