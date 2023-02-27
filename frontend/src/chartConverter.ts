export function scatterChartData(fundings) {
  try {
    console.log(`fundings: ${JSON.stringify(fundings)}`);
    const buckets = fundings.aggregations.company_name.buckets;
    const data = buckets.map((bucket) => {
      const bucketKey = bucket.fundings_over_time.buckets[0].top_funding_hits.hits.hits[0]._source.company_name;
      const fundingsOverTime = bucket.fundings_over_time.buckets;
      return {
        label: bucketKey,
        data: fundingsOverTime.map((funding) => ({
          x: funding.key,
          y: funding.top_funding_hits.hits.hits[0]._source.raised_amount_usd || 0,
        })
      )};
    });
    
    return data;
  } catch (e) {
    console.error(e);
    return [{
      label: 'Scatter Dataset',
      data: [{
        x: -10,
        y: 0
      }, {
        x: 0,
        y: 10
      }, {
        x: 10,
        y: 5
      }, {
        x: 0.5,
        y: 5.5
      }],
      backgroundColor: 'rgb(255, 99, 132)'
    }];
  }
}
