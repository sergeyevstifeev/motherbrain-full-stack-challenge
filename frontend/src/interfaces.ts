export interface Org {
  uuid: string
  company_name: string
  homepage_url: string
  country_code: string
  city: string
  short_description: string
  description: string
  funding_rounds: string
  funding_total_usd: string
  employee_count: string
}

export interface Funding {
  company_uuid: string
  company_name: string
  investment_type: string
  raised_amount_usd: number
  investor_names: string
}

export interface FundingsResponse {
  aggregations: {
    company_name: {
      buckets: Array<{
        fundings_over_time: {
          buckets: Array<{
            key_as_string: string
            top_funding_hits: {
              hits: {
                hits: Array<{
                  _source: Funding
                }>
              }
            }
          }>
        }
      }>
    }
  }
}

export type OrgsResponse = Record<string, Org>

export interface TooltipContext {
  x: string
  y: number
  company_name: string
  investment_type: string
  raised_amount_usd: number | null
  investor_names: string
  company_uuid: string
}
