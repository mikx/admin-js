
/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'CHANNELS_ERROR',
    data: message,
  })));
}

/**
  * Get Channels
  */
export function getChannels() {
  return dispatch => new Promise(resolve => {
    const channels = [{id: 1, name: 'Channel One'}, {id: 2, name: 'Channel Two'}]
    return resolve(dispatch({
        type: 'CHANNELS_REPLACE',
        data: channels,
      }))
  })
}
