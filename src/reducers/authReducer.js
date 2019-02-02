import {
  AUTH_USER,
  SENT_AUTH,
  UNAUTH_USER,
  AUTH_ERROR,
  AUTH_VALIDATE,
  UNAUTH_VALIDATE,
  OPEN_PROTECTED,
  CLOSE_PROTECTED
} from '../actions/types';

export const INITIAL_STATE = {
  error: '',
  authenticated: false,
  isAuthenticating: false,
  isValidating:false,
  isProtected:false
};

//专门用来登录验证的reducer
export default function(state = INITIAL_STATE, action) {
  switch(action.type) {
    case SENT_AUTH:
      return { ...state, error: '', isAuthenticating: true };
    case AUTH_USER:
      return { ...state, error: '', authenticated: true, isAuthenticating: false };
    case UNAUTH_USER:
      return { ...state, authenticated: false, isAuthenticating: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload, isAuthenticating: false };
    case AUTH_VALIDATE:
      return { ...state, isValidating:true};
    case UNAUTH_VALIDATE:
      return { ...state,isValidating:false};
    case OPEN_PROTECTED:
      return { ...state,isProtected:true};
    case CLOSE_PROTECTED:
      return { ...state,isProtected:false};
    default:
      return state;
  }
}
