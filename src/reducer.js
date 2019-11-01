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
        // case 'submit':
        //     return {...state,submitdata: action.text}
        // case 'content':
        //     return {...state,content:action.text}
        case 'category':
            return {...state,category: action.text}
        case 'search_result_content':
            // return state.set('')
            return {...state,contentlist: action.text}
        case 'picurls':
            return {...state,picurls: action.text}
        case 'searchOptionChange':
            switch (action.text.key) {
                case 'title':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{title:action.text.value})})
                case 'date':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{date:action.text.value})})
                case 'changeDate':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{changeDate:action.text.value})})
                case 'show':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{show:action.text.value})})
                case 'tags':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{tags:action.text.value})})
                case 'category':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{category:action.text.value})})
                case 'subCategory':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{subCategory:action.text.value})})
                case 'pageNo':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{pageNo:action.text.value})})
                case 'pageSize':
                    return Object.assign(state,{contentSearchOption:Object.assign(state['contentSearchOption'],{pageSize:action.text.value})})
            }
        case 'coverImgUrl':
            return {...state,coverImgUrl: action.text}
        default:
            return state
    }
}


export default reducer