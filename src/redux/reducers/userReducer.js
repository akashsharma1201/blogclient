import { REGISTER_USER } from "../constants/userConstants";

const intialState = {
    loading: false,
    userInfo: {},
    userToken: null
}



const userReDucer = (state = intialState, action) => {
    console.log(action.payload, "reducer");
    switch (action.type) {
        case REGISTER_USER:            
            return {
                ...state,
                loading: true,
                userInfo: action.payload.user,
                userToken: action.payload.token
            }
        default:
            return state
    }
}

export { userReDucer };