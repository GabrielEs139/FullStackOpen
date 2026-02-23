import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [operationMessage, setOperationMessage] = useState(null)
  const [operationStatus, setOperationStatus] = useState(0)

  useEffect(() => {
    personService
    .getAll()
      .then(initialPersons => {
      setPersons(initialPersons)
      })}, 
    [])

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
        name: newName,
        number: newNumber
      }  

    if(!persons.some(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())){
      personService
      .create(newPerson)
      .then(returnedPerson =>{
        setOperationStatus(0)
        setOperationMessage(
          `Added '${newPerson.name}'`
        )
        setTimeout(() => {
          setOperationMessage(null)
        }, 5000)
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
      
    }
    else{
      if(confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        const person = persons.find(n => n.name.toLowerCase() === newName.toLowerCase())
        console.log(person.id)
        updatePerson(person.id, newPerson)     
      }
      else{
        setNewName('')
        setNewNumber('')
      }
    }  
  }

  const updatePerson = (id, newPerson) => {
    personService
    .update(id, newPerson)
    .then(returnedPerson => {

        setOperationStatus(0)
        setOperationMessage(
          `the person with '${newPerson.name}' had their number updated`
        )
        setTimeout(() => {
          setOperationMessage(null)
        }, 5000)
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')  
      })
      .catch(error => {
        setOperationStatus(1)
        setOperationMessage(
          `the person '${newPerson.name}' was already deleted from server`
        )
        setTimeout(() => {
          setOperationMessage(null)
          setOperationStatus(0)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
        setNewName('')
        setNewNumber('')
    })
  }

  const deletePerson = (id) => {
    const person = persons.find(n => n.id === id)
    if(confirm(`Delete user ${person.name}?`)){
      personService
      .deletePerson(id)
      .then(
        returnedPerson =>{
          setOperationStatus(0)
          setOperationMessage(
            `the person '${returnedPerson.name}' has been deleted`
          )
          setTimeout(() => {
            setOperationMessage(null)
          }, 5000)
          setPersons(persons.filter(n => n.id !== id))
        }
      )
      .catch(error => {
        setOperationStatus(1)
        setOperationMessage(
          `the person '${person.name}' was already deleted from server`
        )
        setTimeout(() => {
          setOperationMessage(null)
          setOperationStatus(0)
        }, 5000)
        setPersons(persons.filter(n => n.id !== id))
      })
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }
  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLocaleLowerCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={operationMessage} op={operationStatus}/>
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} deletePerson={deletePerson}/>  
    </div>
  )
}

export default App