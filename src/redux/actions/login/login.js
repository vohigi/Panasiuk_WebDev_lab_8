import axios from "axios";

import * as actionTypes from "../actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
  };
};

export const authFail = (errors) => {
  return {
    type: actionTypes.AUTH_FAIL,
    errors: errors,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignup) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyB5cHT6x62tTe-g27vBDIqWcwQWBSj3uiY";
    if (!isSignup) {
      url = "/api/users/login";
    }
    axios
      .post(url, authData)
      .then((response) => {
        const expirationDate = new Date(new Date().getTime() + 60 * 1000);
        console.log(expirationDate);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("userId", response.data.user.userId);
        dispatch(authSuccess(response.data.token, response.data.user.userId));
        //dispatch(checkAuthTimeout(new Date(new Date().getTime() + 60 * 1000)));
      })
      .catch((err) => {
        console.log(err.response);
        dispatch(authFail(err.response.data.errors));
      });
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    path: path,
  };
};

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId));
        dispatch(
          checkAuthTimeout(
            (expirationDate.getTime() - new Date().getTime()) / 1000
          )
        );
      }
    }
  };
};
