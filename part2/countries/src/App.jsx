import { useState, useEffect } from 'react'
import axios from 'axios'
import Countries from './components/Countries'
import Filter from './components/Filter'
import countryService from './services/countries'
import weatherService from "./services/weather"
const App = () => {
  const [value, setValue] = useState('')
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    countryService
    .getAll()
      .then(AllCountries => {
      setCountries(AllCountries)
      })}, 
  [])



  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setSearchTerm(value)
 
  }

  const showCountry = (commonName) => {
    setSearchTerm(commonName)
  }

  

  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <div>
      <Filter value={value} handleChange={handleChange} onSearch={onSearch}/>
      <Countries countries={countriesToShow} showCountry={showCountry}/>
    </div>
  )
}

export default App