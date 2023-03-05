import { type ComponentMeta, type ComponentStory } from '@storybook/react'
import React from 'react'

import FundingRoundsByKeyword from '../FundingRoundsByKeyword'

const componentMeta: ComponentMeta<typeof FundingRoundsByKeyword> = {
  title: 'FundingRoundsByKeyword',
  component: FundingRoundsByKeyword,
  parameters: {
    layout: 'fullscreen'
  }
}
export default componentMeta

export const SampleData: ComponentStory<typeof FundingRoundsByKeyword> = ({ fundingsProvider, orgsProvider }) => <FundingRoundsByKeyword fundingsProvider={fundingsProvider} orgsProvider={orgsProvider} />

SampleData.args = {
  fundingsProvider: async () => await Promise.resolve({
    aggregations: {
      company_name: {
        buckets: [
          {
            fundings_over_time: {
              buckets: [
                {
                  key_as_string: '2015-03-01T00:00:00.000Z',
                  top_funding_hits: {
                    hits: {
                      hits: [
                        {
                          _source: {
                            company_name: 'company_name1',
                            investment_type: 'investment_type1',
                            raised_amount_usd: 7777,
                            investor_names: '{investor_name,investor_name2}',
                            company_uuid: 'bbf5972f-7661-453c-c008-dbc46c8a405b'
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  key_as_string: '2016-01-01T00:00:00.000Z',
                  top_funding_hits: {
                    hits: {
                      hits: [
                        {
                          _source: {
                            company_name: 'company_name1',
                            investment_type: 'investment_type2',
                            raised_amount_usd: 8888,
                            investor_names: '{investor_name3,investor_name4}',
                            company_uuid: 'bbf5972f-7661-453c-c008-dbc46c8a405b'
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          },
          {
            fundings_over_time: {
              buckets: [
                {
                  key_as_string: '2015-02-01T00:00:00.000Z',
                  top_funding_hits: {
                    hits: {
                      hits: [
                        {
                          _source: {
                            company_name: 'company_name2',
                            investment_type: 'investment_type1',
                            raised_amount_usd: 1234,
                            investor_names: '{investor_name,investor_name2}',
                            company_uuid: 'cc47f157-9f73-31f4-499d-58dc350147ac'
                          }
                        }
                      ]
                    }
                  }
                },
                {
                  key_as_string: '2016-02-01T00:00:00.000Z',
                  top_funding_hits: {
                    hits: {
                      hits: [
                        {
                          _source: {
                            company_name: 'company_name2',
                            investment_type: 'investment_type2',
                            raised_amount_usd: 5678,
                            investor_names: '{investor_name3,investor_name4}',
                            company_uuid: 'cc47f157-9f73-31f4-499d-58dc350147ac'
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        ]
      }
    }
  }),
  // @ts-expect-error - this is a mock
  orgsProvider: async () => await Promise.resolve({
    'bbf5972f-7661-453c-c008-dbc46c8a405b': {
      short_description: 'short_description1'
    },
    'cc47f157-9f73-31f4-499d-58dc350147ac': {
      short_description: 'short_description2'
    }
  })
}
