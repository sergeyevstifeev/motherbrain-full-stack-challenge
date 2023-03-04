import {
  Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, TimeScale, Tooltip
} from 'chart.js';
import 'chartjs-adapter-moment';
import autocolors from 'chartjs-plugin-autocolors';
import React from "react";
import { Scatter } from 'react-chartjs-2';
import { scatterChartData } from "./chartConverter";
import { TooltipContext } from "./interfaces";

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

export default function ScatterChart({fundings, orgs}) {
  return <Scatter
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: false,
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
                    },
                    footer: function (context) {
                      const itemContext = context[0].raw as TooltipContext;
                      return orgs[itemContext.company_uuid]?.short_description
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
