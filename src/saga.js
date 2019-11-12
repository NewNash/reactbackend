import {all, put, takeEvery,select} from 'redux-saga/effects'

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

//获取目录列表
function* getCategoryAsync() {
    let data
    yield axios.get('https://stayalone.cn/getcategory').then(res=>data=res.data.data)
    yield put({type:'category',text:data})
}
function* getCategory() {
    yield takeEvery('getCategory',getCategoryAsync)
}

//获取文章列表
function* getConlentlistAsync() {
    const state = yield select()
    let data
    yield axios.post('https://stayalone.cn/searchcontents',state.contentSearchOption).then(res=>data=res.data)
    yield put({type:'search_result_content',text:data})
}
function* getConlentlist() {
    yield takeEvery('contentlist',getConlentlistAsync)
}

//获取图片列表
function* getpicurlAsync() {
    let data
    yield axios.get('https://stayalone.cn/picmanage').then(res=>data=res.data.data)
    yield put({type:'picurls',text:data})
}
function* getpicurl() {
    yield takeEvery('getpicurl',getpicurlAsync)
}
export default function* rootsaga() {
    yield all([
        login(),
        // getContent(),
        getCategory(),
        getConlentlist(),
        getpicurl()
    ])
}