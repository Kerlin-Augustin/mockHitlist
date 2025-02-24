function Company({company, location, industry, applied, description}){

  return (
    <div>
        <h3>Company: {company}</h3>
        <p>Location:{location}</p>
        <p>Industry:{industry}</p>
        <p>Applied: {applied}</p>
        <p>Description:{description}</p>
      </div>
  )
}

export default Company