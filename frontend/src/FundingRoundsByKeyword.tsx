import React, { useEffect, useState } from 'react'
import ScatterChart from './ScatterChart'

export default function FundingRoundsByKeyword (): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('finance')
  const [fundings, setFundings] = useState([])
  const [orgs, setOrgs] = useState([])

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value)
  };

  useEffect(() => {
    setIsLoading(true)

    Promise.all([
      fetch(new URL(`http://localhost:8080/fundings?q=${searchTerm}`))
        .then(async (response) => await response.json())
        .then((responseJson) => {
          const hits = responseJson.results.hits
          setFundings(hits)
        }),
      fetch(new URL(`http://localhost:8080/orgs?q=${searchTerm}`))
        .then(async (response) => await response.json())
        .then((responseJson) => {
          const hits = responseJson.results.hits
          setOrgs(hits)
        })
    ]).then(() => {
      setIsLoading(false)
    }).catch((e) => {
      console.error(e)
    })
  }, [searchTerm])

  const Chart: React.FC = () => isLoading
    ? <div>Loading</div>
    : <ScatterChart fundings={fundings} orgs={orgs} />

  return (
    <div style={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
      <h1>Funding Rounds By Keyword</h1>
      <div style={{ marginBottom: 20 }}>
        <input type="search" onChange={handleChange} value={searchTerm}></input>
      </div>
      <div style={{ width: '80%' }}>
        <Chart />
      </div>
    </div>
  )
}
