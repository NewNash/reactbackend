const initState = {
    iflogin:false,
    submitdata:{}
}


const reducer = (state=initState,action)=>{
    switch (action.type) {
        case 'login':
            return {...state,iflogin: action.text}
        case 'submit':
            return {...state,submitdata: action.text}
        default:
            return state
    }
}


export default reducer