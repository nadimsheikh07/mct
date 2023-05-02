import React, { useState } from 'react'
import fetch from 'isomorphic-unfetch'

const Home = ({ data }) => {
  const [results, setResults] = useState(data);
  console.log(results);
  return (
    <div>
      Home Page
    </div>
  )
}

Home.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/users')
  const json = await res.json()
  return { data: json }
}

export default Home