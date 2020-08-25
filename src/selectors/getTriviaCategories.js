import axios from 'axios'

export const getTriviaCategories = async () => {
  const api_url = 'https://opentdb.com/api_category.php'
  return await axios.get(api_url)
    .then(data => data)
    .then(({data}) => data.trivia_categories)
    .catch(error => console.warn(error))
}