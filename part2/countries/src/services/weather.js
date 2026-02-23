import axios from 'axios'
const api_key = import.meta.env.VITE_SOME_KEY
const baseUrl = 'https://api.openweathermap.org'

const getWeather = (capital) => {
  const request = axios.get(`${baseUrl}/data/2.5/weather?q=${capital}&mode=json&units=metric&APPID=${api_key}`)
  const response = request.then(response => response.data)
  console.log(response);
  return response
}



export default { 
  getWeather
}