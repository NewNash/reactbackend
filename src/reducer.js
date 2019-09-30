const initState = {
    iflogin:false,
    submitdata:{},
    content:{},
    category:[],
}


const reducer = (state=initState,action)=>{
    switch (action.type) {
        case 'login':
            return {...state,iflogin: action.text}
        case 'submit':
            return {...state,submitdata: action.text}
        case 'content':
            return {...state,content:action.text}
        case 'category':
            return {...state,category: action.text}
        default:
            return state
    }
}


export default reducer