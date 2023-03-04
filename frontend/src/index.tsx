import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import FundingRoundsByKeyword from './FundingRoundsByKeyword'

const root = document.querySelector('#root')
if (root) {
  ReactDOM.createRoot(root).render(
    <FundingRoundsByKeyword />
  )
}
