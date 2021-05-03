export const STOCK_LIMIT = 15;
export const HIGHEST_RATING = 5;
export const QTY_SELECT_LIMIT = 20;

// reducer action types for product list
export const PRODUCT_LIST_REQUEST = "PRODUCT_LIST_REQUEST";
export const PRODUCT_LIST_SUCCESS = "PRODUCT_LIST_SUCCESS";
export const PRODUCT_LIST_FAIL = "PRODUCT_LIST_FAIL";

// reducer action types for product details
export const PRODUCT_DETAILS_REQUEST = "PRODUCT_DETAILS_REQUEST";
export const PRODUCT_DETAILS_SUCCESS = "PRODUCT_DETAILS_SUCCESS";
export const PRODUCT_DETAILS_FAIL = "PRODUCT_DETAILS_FAIL";

// action types for cart
export const CART_ADD_ITEM = "CART_ADD_ITEM";
export const CART_REMOVE_ITEM = "CART_REMOVE_ITEM";
export const CART_CLEAR_ITEMS = "CART_CLEAR_ITEMS";
export const CART_SAVE_SHIPPING_ADDRESS = "CART_SAVE_SHIPPING_ADDRESS";
export const CART_SAVE_PAYMENT_METHOD = "CART_SAVE_PAYMENT_METHOD";

//user login & logout
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_LOGIN_FAIL = "USER_LOGIN_FAIL";

export const USER_LOGOUT = "USER_LOGOUT";

// user register action type constants
export const USER_REGISTER_REQUEST = "USER_REGISTER_REQUEST";
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS";
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL";

// user profile details action type constants
export const USER_DETAILS_REQUEST = "USER_DETAILS_REQUEST";
export const USER_DETAILS_SUCCESS = "USER_DETAILS_SUCCESS";
export const USER_DETAILS_FAIL = "USER_DETAILS_FAIL";
export const USER_DETAILS_RESET = "USER_DETAILS_RESET";

// user profile update action type constants
export const USER_UPDATE_REQUEST = "USER_UPDATE_REQUEST";
export const USER_UPDATE_SUCCESS = "USER_UPDATE_SUCCESS";
export const USER_UPDATE_FAIL = "USER_UPDATE_FAIL";
export const USER_UPDATE_RESET = "USER_UPDATE_RESET";

// action types of for creating order
export const ORDER_CREATE_REQUEST = "ORDER_CREATE_REQUEST";
export const ORDER_CREATE_SUCCESS = "ORDER_CREATE_SUCCESS";
export const ORDER_CREATE_FAIL = "ORDER_CREATE_FAIL";
export const ORDER_CREATE_RESET = "ORDER_CREATE_RESET";

// order detail action types
export const ORDER_DETAILS_REQUEST = "ORDER_DETAILS_REQUEST";
export const ORDER_DETAILS_SUCCESS = "ORDER_DETAILS_SUCCESS";
export const ORDER_DETAILS_FAIL = "ORDER_DETAILS_FAIL";

// order list for user
export const ORDER_MY_LIST_REQUEST = "ORDER_MY_LIST_REQUEST";
export const ORDER_MY_LIST_SUCCESS = "ORDER_MY_LIST_SUCCESS";
export const ORDER_MY_LIST_FAIL = "ORDER_MY_LIST_FAIL";
export const ORDER_MY_LIST_RESET = "ORDER_MY_LIST_RESET";
