import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const averageN = ((props.good)-(props.bad))/props.all
  const positiveN = props.good/props.all*100
  
  if (props.all == 0) {
    return (
      <div>
        No feedback given yet
      </div>
    )
  }

  return(
  <table>

    <StatisticLine text='good' value={props.good}/>
    <StatisticLine text='neutral' value={props.neutral}/>
    <StatisticLine text='bad' value={props.bad}/>
    <StatisticLine text='all' value={props.all}/>
    <StatisticLine text='average' value={averageN}/>
    <StatisticLine text='positive' value={positiveN}/>

  </table>
 )
}
  
const StatisticLine = ({text, value}) =>{

  if(text == 'positive'){
    return <tbody>
      <tr><td>{text}</td><td>{value} %</td></tr>
    </tbody>
  }

  return <tbody>
      <tr><td>{text}</td><td>{value} </td></tr>
    </tbody>
}
  



const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)


  const handleGoodClick = () => {
      const updatedGood = good +1
      setGood(updatedGood)
      setAll(updatedGood+neutral+bad)
    }
  const handleNeutralClick = () => {
      const updatedNeutral = neutral +1
      setNeutral(updatedNeutral)
      setAll(good+updatedNeutral+bad)
    }
  const handleBadClick = () => {
      const updatedBad = bad +1
      setBad(updatedBad)
      setAll(good+neutral+updatedBad)
    }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {handleGoodClick} text='good'/>
      <Button handleClick = {handleNeutralClick} text='neutral'/>
      <Button handleClick = {handleBadClick} text='bad'/>
      <h1>statistics</h1>
      <Statistics good = {good} neutral = {neutral} bad = {bad} all = {all}/>
    </div>
  )
}

export default App