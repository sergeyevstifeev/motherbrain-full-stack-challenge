export function scatterChartData(fundings) {
  const buckets = fundings.aggregations.company_name.buckets;
  const data = buckets.map((bucket) => {
    const bucketKey = bucket.fundings_over_time.buckets[0].top_funding_hits.hits.hits[0]._source.company_name;
    const fundingsOverTime = bucket.fundings_over_time.buckets;
    return {
      label: bucketKey,
      data: fundingsOverTime.map((funding) => ({
        x: funding.key_as_string,
        y: funding.top_funding_hits.hits.hits[0]._source.raised_amount_usd || 0,
      })
    )};
  });
  
  return data;
}
