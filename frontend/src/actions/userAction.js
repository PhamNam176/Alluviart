import axios from "axios";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_RESET,
  ORDER_MY_LIST_RESET,
} from "../config";

// action for user login
export const loginUser = (email, userPassword) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // api call with user name and password
    const { data } = await axios.post(
      "api/users/login/",
      {
        username: email,
        password: userPassword,
      },
      requestConfig
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    //save retrieved data in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// action for user logout
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({
    type: USER_LOGOUT,
  });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_LIST_RESET });
};

//action for user register
export const registerUser = (userName, email, userPassword) => async (
  dispatch
) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // api call with user name and password
    const { data } = await axios.post(
      "api/users/register/",
      {
        name: userName,
        email: email,
        password: userPassword,
      },
      requestConfig
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    //save retrieved data in local storage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// action to get user profile
export const getUserProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // api call to update user
    const { data } = await axios.get(`api/users/${id}/`, requestConfig);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

// action to update user profile
export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const requestConfig = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    // api call for user details with id
    const { data } = await axios.put(
      "api/users/profile/update/",
      user,
      requestConfig
    );

    dispatch({
      type: USER_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
