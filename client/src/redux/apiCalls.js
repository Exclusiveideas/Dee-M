import { authStart, authFailure, authSuccess } from './userSlice';
import { publicReq } from '../axios';

export const login = async(dispatch, user) => {
    dispatch(authStart());
    try{
        const res = await publicReq.post("/auth/login", user);
        dispatch(authSuccess(res.data))
    } catch(err) {
        console.log(err)
        dispatch(authFailure(err.response?.data))
    }
}

export const register = async(dispatch, user) => {
    dispatch(authStart());
    try{
        const res = await publicReq.post("/auth/register", user);
        dispatch(authSuccess(res.data))
    } catch(err) {
        dispatch(authFailure(err.response?.data))
    }
} 