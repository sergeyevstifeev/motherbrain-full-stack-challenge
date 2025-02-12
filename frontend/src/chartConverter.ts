import { type Funding, type FundingsResponse, type TooltipContext } from './interfaces'

export function scatterChartData (fundings: FundingsResponse): Array<{ label: string, data: TooltipContext[] }> {
  const buckets = fundings.aggregations.company_name.buckets
  const data = buckets.map((bucket) => {
    const bucketKey = bucket.fundings_over_time.buckets[0].top_funding_hits.hits.hits[0]._source.company_name
    const fundingsOverTime = bucket.fundings_over_time.buckets
    return {
      label: bucketKey,
      data: fundingsOverTime.map((funding): TooltipContext => {
        const fundingData: Funding = funding.top_funding_hits.hits.hits[0]._source

        return {
          x: funding.key_as_string,
          y: fundingData.raised_amount_usd ?? 0,
          company_name: fundingData.company_name,
          investment_type: fundingData.investment_type,
          raised_amount_usd: fundingData.raised_amount_usd,
          investor_names: fundingData.investor_names,
          company_uuid: fundingData.company_uuid
        }
      })
    }
  })

  return data
}
