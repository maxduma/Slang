import { setAuthCurrentUserData } from "./auth-reducer";

const INITIALIZED_SUCCESS = 'INITIALIZED_SUCCESS';

const initialState = {
  initialized: false
};

const appReducer = (state = initialState, action) => {
  switch(action.type) {
      case INITIALIZED_SUCCESS:
       return {
          ...state,
          initialized: true
        }
      default:
        return state;
    }
};

export const initializedSuccess = () => ({type: INITIALIZED_SUCCESS});

export const initializedApp = (name, surname, location, personalInformation, gender, uid, email, urlPhoto, status, following, followers, iLikePostsUids) => (dispatch) => {
  const promise  = dispatch(setAuthCurrentUserData(name, surname, location, personalInformation, gender, uid, email, urlPhoto, status, true, following, followers, iLikePostsUids));
  Promise.all([promise])
  .then(() => {
    dispatch(initializedSuccess());
  })
};
export default appReducer;