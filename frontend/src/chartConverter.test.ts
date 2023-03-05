import { scatterChartData } from './chartConverter'

const mockData = {
  aggregations: {
    company_name: {
      buckets: [
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
                          company_name: 'company_name1',
                          investment_type: 'investment_type1',
                          raised_amount_usd: 1234,
                          investor_names: '{investor_name,investor_name2}',
                          company_uuid: 'bbf5972f-7661-453c-c008-dbc46c8a405b'
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
}

test('converts correctly', () => {
  expect(scatterChartData(mockData)).toEqual([
    {
      label: 'company_name1',
      data: [
        {
          company_name: 'company_name1',
          company_uuid: 'bbf5972f-7661-453c-c008-dbc46c8a405b',
          investment_type: 'investment_type1',
          investor_names: '{investor_name,investor_name2}',
          raised_amount_usd: 1234,
          x: '2015-02-01T00:00:00.000Z',
          y: 1234
        },
        {
          company_name: 'company_name2',
          company_uuid: 'cc47f157-9f73-31f4-499d-58dc350147ac',
          investment_type: 'investment_type2',
          investor_names: '{investor_name3,investor_name4}',
          raised_amount_usd: 5678,
          x: '2016-02-01T00:00:00.000Z',
          y: 5678
        }
      ]
    }
  ])
})
