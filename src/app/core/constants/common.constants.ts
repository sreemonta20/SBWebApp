import { Injectable } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class CommonConstants { }

export const SessionConstants = {
  LOGGED_IN_USER: 'loggedInUser',
  IS_LOGGED_IN: 'isLoggedIn',
  AUTH_TOKEN: 'auth_token',
  AUTH_REFRESH_TOKEN: 'auth_refresh_token',
  USER_MENU:'user_menu',
  SERIALIZED_MENU: 'serialized_menu'
};

export const RouteConstants = {
  LOGIN_USER_URL: 'auth/login',
  BUSINESS_HOME_URL: '/business/home',
  HOME_DASHBOARD_URL: '/home/dashboard'
}

export const APIConstants = {
  APPLICATION_JSON: 'application/json',
  ORIGIN_XREQ_CONTENT_TYPE_ACCEPT:
    'Origin, X-Requested-With, Content-Type, Accept',
  ACCEPT: 'Accept',
  CONTENT_TYPE: 'Content-Type',
  ACCESS_CONTROL_ALLOW_HEADERS: 'Access-Control-Allow-Headers',
  AUTHORIZATION: 'Authorization',
  BEARER: 'Bearer',
  TOKEN: 'access_token',
  API_GET_USER_BY_ID_URL: '/api/User/getUserbyId',
  API_GET_ALL_USERS_URL:'/api/User/getAllUsers',
  API_USER_LOGIN_URL: '/api/User/login',
  API_REFRESH_TOKEN_URL: '/api/User/refreshtoken',
  API_REVOKE_URL: '/api/User/revoke',
  API_REGISTER_USER_URL: '/api/User/registerUser',
  API_DELETE_USER_URL: '/api/User/deleteUser'
}

export const MessageConstants = {
  GENERAL_SUCCESS_TITLE: 'Success',
  GENERAL_SUCCESS_MSG: 'Success!!',
  GENERAL_WARNING_TITLE: 'Warning',
  GENERAL_WARNING_MSG: 'Warning!!',
  GENERAL_ERROR_TITLE: 'Error',
  GENERAL_ERROR_MSG: 'Error!!',
};

export const DataTypeConstants = {
  Date: 'Date',
  String: 'String',
  Number: 'Number',
  Boolean: 'Boolean',
};


export const Common = {
  CONTROL_USER_NAME: 'username',
  CONTROL_PASSWORD: 'password',
  RETURN_URL: 'returnUrl',
  HOME_TEXT: 'Home',
  APPCONFIG_TEXT: 'App Configuration',
};

export const ErrorCode = {
  CS0200: 'CS0200',
  CS0200_MESSAGE: "Token information doesn't exist in the local session",

};
