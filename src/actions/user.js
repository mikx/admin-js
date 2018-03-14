import fetch from 'isomorphic-fetch';
import ErrorMessages from '../constants/errors';
import statusMessage from '../actions/status';
import config from '../constants/config';

import { asyncDispatchChannels }from '../actions/channels';

export function signUp() { return (dispatch) => new Promise((resolve) => resolve()) }

export function resetPassword() { return (dispatch) => new Promise((resolve) => resolve()) }

export function updateProfile() { return (dispatch) => new Promise((resolve) => resolve()) }

export function getMemberData() {
  return async (dispatch) => {
    try {
      const response = await fetch(`${config.base}/user/id`, {
        method: 'GET',
        credentials: 'include',
      })
      const data = await response.json()
      dispatch({
          type: 'USER_SESSION',
          data: data,
      })
    } catch (err) {
      dispatch({
          type: 'USER_SESSION',
          data: { },
      })
    }
  }
}

export function logout() {
  return (dispatch) => new Promise(async (resolve, reject) => {
    const response = await fetch(`${config.base}/session`, {
      method: 'DELETE',
      credentials: 'include',
    })
    const data = await response.json()
    dispatch({
      type: 'USER_LOGOUT',
      data: data,
    })
    resolve(true)
  })
}

export function login(formData) {

  const { email, password } = formData;

  return dispatch => new Promise(async (resolve, reject) => {

    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    try {

      const response = await fetch(`${config.base}/session`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password}),
        credentials: 'include',
      })

      const data = await response.json()

      dispatch({
        type: 'USER_LOGIN',
        data: data,
      })

      asyncDispatchChannels(dispatch)

      return resolve(true);

    } catch(error) {

      await statusMessage(dispatch, 'loading', false);
      return reject(error);

    }
  });
}

