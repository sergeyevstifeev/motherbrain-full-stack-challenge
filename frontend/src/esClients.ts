import { type FundingsResponse, type OrgsResponse } from './interfaces'

export async function esFundingsClient (searchTerm: string): Promise<FundingsResponse> {
  const response = await fetch(new URL(`http://localhost:8080/fundings?q=${searchTerm}`))
  const responseJson = await response.json()
  return responseJson.results.hits
}

export async function esOrgsClient (searchTerm: string): Promise<OrgsResponse> {
  const response = await fetch(new URL(`http://localhost:8080/orgs?q=${searchTerm}`))
  const responseJson = await response.json()
  return responseJson.results.hits
}
