import * as types from '../type';

const initialState = {

    userLogin:false,
    notification:[],
}


export default (state = initialState ,action) => {

    switch(action.type){
        case types.LOGIN_USER :
        return{
            ...state,
            userLogin:action.payload,
        }
        break;
        case types.NOTIFICATION_TAGS :
        return{
            ...state,
          notification:action.payload,
        
        }
       break;
        default :
        return state;

    }
}
