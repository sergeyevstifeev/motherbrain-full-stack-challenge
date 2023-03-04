import {
  Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, TimeScale, Tooltip
} from 'chart.js';
import 'chartjs-adapter-moment';
import autocolors from 'chartjs-plugin-autocolors';
import React, { useEffect, useState } from "react";
import { Scatter } from 'react-chartjs-2';
import { scatterChartData } from "../chartConverter";
import { Funding, TooltipContext } from "../interfaces";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend, TimeScale, autocolors);

const usdFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

function formatTooltipLabel(context: TooltipContext) {
  const amountString = context.raised_amount_usd ? usdFormatter.format(context.raised_amount_usd) : 'Unknown amount';
  const investorsString = context.investor_names !== "{}" ? ` by ${context.investor_names.replace(/{|}|"/g, '')}` : '';
  return `${amountString} ${context.investment_type} round${investorsString}`;
}

function ScatterChart(fundings: Funding[]) {
    return <Scatter
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'right',
                    labels: {
                      font: {
                        size: 16,
                      }
                    }
                  },
                  tooltip: {
                    callbacks: {
                      title: function (context) {
                        const itemContext = context[0].raw as TooltipContext;
                        return itemContext.company_name;
                      },
                      label: function (context) {
                        const itemContext = context.raw as TooltipContext;
                        return formatTooltipLabel(itemContext);
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    display: true,
                    type: 'time',                                   
                  },
                  y: {
                    beginAtZero: true,
                  },
                }
              }}
              data={{
                datasets: scatterChartData(fundings)
              }}
            />;
}

export default function FundingRoundsByKeyword() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("finance");
  const [fundings, setFundings] = useState<Funding[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    const url = new URL("http://localhost:8080/fundings");
    url.searchParams.set("limit", String(50));
    url.searchParams.set("offset", String(0));
    url.searchParams.set("q", searchTerm);

    fetch(url).then((response) => response.json()).then((responseJson) => {
      const hits: Funding[] = responseJson.results.hits;
      setFundings(hits);
      setIsLoading(false);
    });
  }, [searchTerm]);

  const Chart: React.FC = () => isLoading ?
    <div>Loading</div>
    :
    <ScatterChart {...fundings} />;

  return (
    <div style={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
      <h1>Funding Rounds By Keyword</h1>
      <div style={{ marginBottom: 20 }}>
        <input type="search" name="org_search" onChange={handleChange} value={searchTerm}></input>      
      </div>
      <div style={{ width: '80%' }}>
        <Chart />
      </div>
    </div>
  );
}
