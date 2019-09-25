const initState = {

}


const reducer = (state=initState,action)=>{
    switch (action.type) {
        case 'login':
            // console.log(action.text)
            return state
        default:
            return state
    }
}


export default reducer