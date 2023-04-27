import './style/userProfile.css'
import { useState } from 'react'

const Input = (props) => {
  const [query, setQuery] = useState("")
  
  const handleChange = (e) => {
    const query = e.target.value
    setQuery(query);
    props.handleChange(query)
  }
  return(
    <div className="input-container">
      <input placeholder="Search by name..." type="text" className="input" value={query} onChange={handleChange}/>
    </div>  
  )
}

export default Input