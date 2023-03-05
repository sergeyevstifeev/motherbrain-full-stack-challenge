import React, { useEffect, useState } from 'react'
import { type FundingsResponse, type OrgsResponse } from './interfaces'
import ScatterChart from './ScatterChart'

interface DataProviders {
  fundingsProvider: (searchTerm: string) => Promise<FundingsResponse>
  orgsProvider: (searchTerm: string) => Promise<OrgsResponse>
}

export default function FundingRoundsByKeyword (props: DataProviders): JSX.Element {
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('finance') // default search term for demo purposes
  const [fundings, setFundings] = useState<FundingsResponse | null>(null)
  const [orgs, setOrgs] = useState<OrgsResponse | null>(null)

  function handleChange (e: React.ChangeEvent<HTMLInputElement>): void {
    setSearchTerm(e.target.value)
  };

  useEffect(() => {
    setIsLoading(true)

    Promise.all([
      props.fundingsProvider(searchTerm).then((fundings) => {
        setFundings(fundings)
      }),
      props.orgsProvider(searchTerm).then((orgs) => {
        setOrgs(orgs)
      })
    ]).then(() => {
      setIsLoading(false)
    }).catch((e) => {
      // Better error handling would be nice.
      console.error(e)
    })
  }, [searchTerm])

  const Chart: React.FC = () => isLoading
    ? <div>Loading</div>
    // @ts-expect-error: Object is possibly 'null'.
    // At this point fundings and orgs should be set.
    : <ScatterChart fundings={fundings} orgs={orgs} />

  return (
      <div style={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
        <h1>Funding Rounds By Keyword</h1>
        <p>The chart shows funding rounds for companies with the specified keyword as part of the name.</p>
        <div style={{ marginBottom: 20 }}>
          <input type="search" onChange={handleChange} value={searchTerm}></input>
        </div>
        <div style={{ width: '80%' }}>
          <Chart />
        </div>
      </div>
  )
}
