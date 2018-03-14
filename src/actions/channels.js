import client from '../apollo/client'
import gql from 'graphql-tag'

const CHANNELS_QUERY = gql`query GetChannels { userAllOrgsChannels { uid, org_uid, name } }`

export const setError = (message) => { return (dispatch) =>
  dispatch({
    type: 'CHANNELS_ERROR',
    data: message,
  })
}

export const asyncDispatchChannels = async (dispatch) => {
  const result = await client.query({ query: CHANNELS_QUERY})
  dispatch({
    type: 'CHANNELS_REPLACE',
    data: result.data.userAllOrgsChannels,
  })
}


export const loadChannels = () => { return (dispatch) => asyncDispatchChannels(dispatch) }
