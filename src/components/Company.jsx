import { useState } from 'react'
import axios from 'axios'

function Company({id, company, location, industry, applied, description, onDelete}){

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3001/company/${id}`)
      .then(() => {
        console.log(`Deleted company with ID: ${id}`)
        onDelete(id)
      })
      .catch(err => console.error(`Error deleting company: ${err}`))
  }

  return (
    <div>
        <h3>Company: {company}</h3>
        <p>Location: {location}</p>
        <p>Industry: {industry}</p>
        <p>Applied: {applied}</p>
        <p>Description: {description}</p>
        <input type="button" value="Delete" onClick={handleDelete}/>
      </div>
  )
}

export default Company