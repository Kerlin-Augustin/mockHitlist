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
  const [filteredList, setFilteredList] = useState([])

  const url = 'http://localhost:3001/company'

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        const data = response.data || []
        setFilteredList(data)
        setCompanyList(data)
      })
      .catch(err => {
        console.error(`There was an error. Maybe something to do with this: ${err}`)
      })
  }, [])

  const handleDeleteCompany = (id) => {
    setCompanyList(prevList => prevList.filter(company => company.id !== id))
    setFilteredList(prevList => prevList.filter(company => company.id !== id))
  }

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

  const allCompany = filteredList?.map(company => (
    <Company
      id={company.id}
      key={company.id}
      company={company.company}
      location={company.location}
      industry={company.industry}
      applied={company.applied}
      description={company.description}
      onDelete={handleDeleteCompany}
    />
  )) || null

  const handleSearchSubmit = (e) => {
    e.preventDefault()

    if (searchCompany.trim() === '') {
      setFilteredList(companyList)
      return
    }

    const filteredCompanies = companyList.filter(company => {
      return company.location.toLowerCase().includes(searchCompany.toLowerCase())
    })

    setFilteredList(filteredCompanies)
  }

  return (
    <>
      <h1>HitList</h1>
      <div>
        <>
          <h3>Search company</h3>
          <form onSubmit={handleSearchSubmit}>
            <input value={searchCompany} placeholder="Company Location" type='text' onChange={(e) => setSearchCompany(e.target.value)} />
            <input type='submit' />
          </form>
        </>
        <>
          <h3>Add Company</h3>
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
