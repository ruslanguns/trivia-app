import axios from 'axios'

export const resetTriviaToken = async (token) => {
  const api_url = 'https://opentdb.com/api_token.php';
  return await axios.get(api_url, { params: { command: 'reset', token }})
    .then(data => data)
    .then(({ data }) => {
      if(data.response_code !== 0) { // ERROR
        return { error: 'Algo ha ocurrido, intentar mas tarde por favor' }
      }
      return data
    })
    .catch(error => console.warn(error))
}