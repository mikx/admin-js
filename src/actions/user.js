import fetch from 'isomorphic-fetch';
import ErrorMessages from '../constants/errors';
import statusMessage from '../actions/status';
import config from '../constants/config';

export function signUp() { return (dispatch) => new Promise((resolve) => resolve()) }

export function resetPassword() { return (dispatch) => new Promise((resolve) => resolve()) }

export function updateProfile() { return (dispatch) => new Promise((resolve) => resolve()) }

export function logout() { return (dispatch) => new Promise((resolve) => resolve()) }

export function getMemberData() { return (dispatch) => new Promise((resolve) => resolve()) }

export function login(formData) {

  const {
    email,
    password,
  } = formData;

  return dispatch => new Promise(async (resolve, reject) => {

    await statusMessage(dispatch, 'loading', true);

    // Validation checks
    if (!email) return reject({ message: ErrorMessages.missingEmail });
    if (!password) return reject({ message: ErrorMessages.missingPassword });

    try {

      const response = await fetch(config.base + 'session', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email,password})
      })

      const data = await response.json()

      dispatch({
        type: 'USER_LOGIN',
        data: data,
      })

      dispatch({
        type: 'CHANNELS_REPLACE',
        data: [{id: 3, name: 'Channel Three'}, {id: 4, name: 'Channel Four'}],
      })

      return resolve(true);

    } catch(error) {
        await statusMessage(dispatch, 'loading', false);
        return reject(error);
    }
  });
}

