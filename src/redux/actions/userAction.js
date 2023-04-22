import axios from "axios";
import { REGISTER_USER } from "../constants/userConstants";


const userRegisterAction = async (data) => {
    console.log(data);    
    return {
        type: REGISTER_USER,
        payload: data
    }
}

export { userRegisterAction }