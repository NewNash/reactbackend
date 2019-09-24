import {all} from 'redux-saga/effects'


function* zhanwei(){
    yield console.log('zhanwei')
}

export default function* rootsaga(){
    yield all([
        zhanwei()
    ])
}