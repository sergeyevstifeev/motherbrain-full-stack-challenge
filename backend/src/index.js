require("dotenv").config();
const http = require("http");
const { URL } = require("url");
const { Client } = require("@elastic/elasticsearch");

const client = new Client({
  node: process.env.ES_URL,
});

http.createServer(handle).listen(8080);

async function handle(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "*");

    const url = new URL(`http://incoming${req.url}`);
    switch (`${req.method} ${url.pathname}`) {
      case "GET /orgs":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchOrgs(url.searchParams),
          })
        );
        break;

      case "GET /fundings":
        res.writeHead(200).end(
          JSON.stringify({
            message: "OK",
            results: await searchFundings(url.searchParams),
          })
        );
        break;

      default:
        res.writeHead(404).end(
          JSON.stringify({
            message: "Not Found",
          })
        );
        break;
    }
  } catch (e) {
    console.error(e.stack);
    res.writeHead(500).end(
      JSON.stringify({
        message: "Something went wrong",
      })
    );
  }
}

async function searchOrgs(queryParams) {
  const q = queryParams.get("q");

  const response = await client.search({
    index: "org",
    body: {
      size: 1000,
      query: {
        match_phrase: {
          company_name: q
        }
      },
    },
  });

  // Convert hits to a map for easier access on the frontend
  const hits = {};
  response.body.hits.hits.forEach((h) => {
    hits[h._source.uuid] = h._source;
  });

  return {
    hits,
    total: response.body.hits.total.value,
  };
}

async function searchFundings(queryParams) {
  const q = queryParams.get("q");

  const response = await client.search({
    index: "funding",
    body: {
      size: 0, // only include aggregations
      query: {
        match_phrase: {
          company_name: q
        }
      },
      aggs: {
        company_name: {
          terms: {
            field: "company_uuid",
            // Would be nice to have raised_amount_usd as numeric in the mapping (currently it's a keyword),
            // it would be possible to sort by round size then or compute total amount raised by company.
            size: 100
          },
          aggs: {
            fundings_over_time: {
              date_histogram: {
                field: "announced_on",
                calendar_interval: "month",
                min_doc_count: 1
              },
              aggs: {
                top_funding_hits: {
                  top_hits: {
                    size: 100
                  }
                }
              }
            }
          }
        }
      }
    },
  });

  return {
    hits: response.body,
    total: response.body.hits.total.value,
  };
}
