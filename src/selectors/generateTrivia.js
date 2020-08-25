import axios from "axios"


export const generateTrivia = async ({ token, category, difficulty }) => {
  const api_url = 'https://opentdb.com/api.php';
  return await axios.get(api_url,{ params: {
      amount: 5,
      token,
      category,
      difficulty,
      type: 'multiple'
    }})
    .then(data => data)
    .then(({data}) => {
      if(data.results) {
        return data.results
      }
    })
    .catch(error => console.warn(error))
}