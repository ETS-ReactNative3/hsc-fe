import base64 from 'base-64';
import {
  AUTH_ACTION, REVOKE_AUTH_ACTION,
} from './constants';
import { BACKEND_CONFIG, FRONTEND_CONFIG } from '../../configs';

export const execAuthenticate = (data) => (dispatch) => {
  console.log(dispatch);
  const url = `${BACKEND_CONFIG.URL}/oauth`;
  const obj = {
    grant_type: 'password',
    username: data.rq_Username,
    password: data.rq_Password,
    client_id: FRONTEND_CONFIG.CLIENT_ID,
    client_secret: FRONTEND_CONFIG.CLIENT_SECRET,
  };
  const searchParams = Object.keys(obj).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`).join('&');
  const parameters = {
    method: 'POST',
    body: searchParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  };
  dispatch(authenticate());
  return new Promise(() => {
    fetch(url, parameters).then((response) =>
      response.json().then((json) => ({
        status: response.status,
        json,
      })
      ))
      .then(({ status, json }) => {
        const dataResponse = {
          status,
          data: json,
        };
        // if (status === 403 || status === 401) {
        //   localStorage.removeItem('isActived');
        //   localStorage.removeItem('authToken');
        // } else {
        localStorage.setItem('isActived', true);
        localStorage.setItem('authToken', dataResponse.data.access_token ? dataResponse.data.access_token : '');
        localStorage.setItem('password', base64.encode(data.rq_Password));
        localStorage.setItem('username', data.rq_Username);
        localStorage.setItem('role', 'admin');
        // }
        dispatch(authenticate(dataResponse));
      }, (error) => {
        const dataResponse = {
          status: 0,
          data: {
            detail: error.message,
          },
        };
        dispatch(authenticate(dataResponse));
      });
  });
};

export const execRevokeAuth = (token) => (dispatch) => {
  const url = `${BACKEND_CONFIG.URL}/oauth/revoke`;
  const parameters = {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const promise = new Promise(() => {
    fetch(url, parameters).then((response) =>
      response.json().then((json) => ({
        status: response.status,
        json,
      })
      ))
      .then(({ status, json }) => {
        const dataResponse = {
          status,
          data: json,
        };
        dispatch(revokeAuth(dataResponse));
      }, (error) => {
        const dataResponse = {
          status: 0,
          data: {
            detail: error.message,
          },
        };
        dispatch(revokeAuth(dataResponse));
      });
  });
  return promise;
};

export const authenticate = (response) => ({
  type: AUTH_ACTION,
  payload: {
    result: response,
  },
});

export const revokeAuth = (response) => ({
  type: REVOKE_AUTH_ACTION,
  payload: {
    result: response,
  },
});
