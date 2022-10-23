import React from 'react'
import { Link } from 'react-router-dom'
const Missing = () => {
  return (
    <main className="Missing">
      <h2>page did'nt found</h2>
      <p>wanna go back to main page?</p>
      <p>
        <Link to='/'>go to home page </Link>
      </p>
    </main>
  )
}

export default Missing