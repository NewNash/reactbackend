const initState = {
    iflogin:false,
    submitdata:{},
    category:[],
    contentlist:{
        // data:[],
        // count:0
    },
    contentSearchOption:{
        pageNo:1,
        pageSize:10,
        date:'',
        changeDate:'',
        show:'',
        tags:'',
        category:'',
        subCategory:'',
        title:''
    },
    picurls:[],
    coverImgUrl:''
}
const reducer = (state=initState,action)=>{
    switch (action.type) {
        case 'login':
            return {...state,iflogin: action.text}
        case 'category':
            return {...state,category: action.text}
        case 'search_result_content':
            return {...state,contentlist: action.text}
        case 'picurls':
            return {...state,picurls: action.text}
        case 'searchOptionChange':
            const temp_option = {}
            temp_option[action.text.key] = action.text.value
            return {...state,contentSearchOption:{...state.contentSearchOption,...temp_option}}
        case 'resetSearchOption':
            return {...state,contentSearchOption:{...initState.contentSearchOption}}
        case 'coverImgUrl':
            return {...state,coverImgUrl: action.text}
        default:
            return state
    }
}


export default reducer