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

export default function* rootsaga() {
    yield all([
        login()
    ])
}