import { useState, useEffect } from 'react'
import axios from 'axios'
import Company from './components/Company'

function App() {
  const [addCompany, setAddCompany] = useState('')
  const [searchCompany, setSearchCompany] = useState('')
  const [addLocation, setAddLocation] = useState('')
  const [addIndustry, setAddIndustry] = useState('')
  const [addApplied, setAddApplied] = useState('')
  const [addDescription, setAddDescription] = useState('')
  const [companyList, setCompanyList] = useState([])

  const url = 'http://localhost:3001/company'

  const handleAddCompany = (e) => {
    e.preventDefault()

    const addedCompanyResource = {
      company: addCompany,
      location: addLocation,
      industry: addIndustry,
      applied: addApplied,
      description: addDescription
    }

    axios
      .post(url, addedCompanyResource)
      .then(response => {
        console.log([response.data])
        setCompanyList(prevList => [...prevList, response.data])
      })
      setAddCompany('')
      setAddLocation('')
      setAddIndustry('')
      setAddApplied('')
      setAddDescription('')
    }
    
  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setCompanyList(response.data || [])
      })
  }, [])

  const allCompany = companyList?.map(company => (
    <Company
      key={company.id}
      company={company.company}
      location={company.location}
      industry={company.industry}
      applied={company.applied}
      description={company.description} />
  )) || null

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    allCompany.filter(company => {
      setAddCompany(company)
    })
  }

  return (
    <>
      <h1>HitList</h1>
      <div>
        <>
          <h3>Search company</h3>
          <form onSubmit={handleSearchSubmit}>
            <input value={searchCompany} placeholder="Search Company" type='text' onChange={(e) => setSearchCompany(e.target.value)} />
            <input type='submit' />
          </form>
        </>
        <>
          <h3>Add company</h3>
          <form onSubmit={handleAddCompany}>
            <input value={addCompany} placeholder="Add Company" type='text' onChange={(e) => setAddCompany(e.target.value)} />
            <input value={addLocation} placeholder="Location" type='text' onChange={(e) => setAddLocation(e.target.value)} />
            <input value={addIndustry} placeholder="Industry" type='text' onChange={(e) => setAddIndustry(e.target.value)} />
            <input value={addApplied} placeholder="Applied" type='text' onChange={(e) => setAddApplied(e.target.value)} />
            <input value={addDescription} placeholder="Description" type='text' onChange={(e) => setAddDescription(e.target.value)} />
            <input type='submit' />
          </form>
        </>
      </div>
      <h2>Companies</h2>
      {allCompany}
    </>
  )
}

export default App


// Do: Build a Hitlist using React (JS or TS)
// Definition of Done:
// Companies should be saved in JSON Server.
// User should be able to add companies.
// User should be able to delete companies.
// User should be able to filter companies based on criteria of the developer’s choice (e.g., by priority, location, or name).
// Implement error handling for at least one API request