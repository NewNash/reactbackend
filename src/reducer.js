const initState = {
    iflogin:false
}


const reducer = (state=initState,action)=>{
    switch (action.type) {
        case 'login':
            return {...state,iflogin: action.text}
        default:
            return state
    }
}


export default reducer