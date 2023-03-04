import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import FundingRoundsByKeyword from './FundingRoundsByKeyword';

ReactDOM.createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <FundingRoundsForSearch />
  </React.StrictMode>
);
