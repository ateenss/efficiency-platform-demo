import axios from 'axios';
import history from "../history/history";
import {
  AUTH_USER,
  SENT_AUTH,
  UNAUTH_USER,
  AUTH_ERROR
} from '../actions/types';
export const INITIAL_STATE = {
  error: '目前没有错误',
  authenticated: false,
  isAuthenticating: false,
};
const LOGIN_ENDPOINT = 'http://localhost:8090/userTable/authContent';

export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SENT_AUTH:
      let message_send_login="";
      console.log("loginuser被调用");
      console.log(action.value.email );
        // POST email and password to API endpoint

       axios.post(LOGIN_ENDPOINT, {email:action.value.email, password:action.value.password })
            .then(response => {
              // If request is successful:
              // store JWT token
              localStorage.setItem('token', response.data.token);
              // redirect to the route '/recordings'
              history.push('/notifications');
            })
            .catch(() => {
              // If request fails
              // update state to show error to user
              console.log("发送ajax错误");
              message_send_login="ajax wrong";
              console.log(message_send_login+"11");
              });
      return { ...state, error: message_send_login, isAuthenticating: true };
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, isAuthenticating: false };
    case UNAUTH_USER:
      return { ...state, authenticated: false, isAuthenticating: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload, isAuthenticating: false };
    default:
      return state;
  }
}
