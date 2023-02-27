import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import FundingRoundsForSearch from './molecules/FundingRoundsForSearch';

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <FundingRoundsForSearch />
  </React.StrictMode>
);
