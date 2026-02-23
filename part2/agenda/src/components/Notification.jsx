const Notification = ({ message, op }) => {
  if (message === null) {
    return null
  }
  
  if(op === 0 && message !== null){
    return (
    <div className="success">
      {message}
    </div>
    )
  }
  else {
    return (
    <div className="error">
      {message}
    </div>
    )
  }
  
}

export default Notification