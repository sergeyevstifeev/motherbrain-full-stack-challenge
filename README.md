# Motherbrain Full Stack Challenge

Hello! :wave:

This is my solution to the challenge.

## Solution description

This solution creates a chart with funding rounds for companies with names that match the provided keyword.

### Backend

Queries were modified slightly. Fundings query finds funding rounds for companies with the provided search term in the company names and aggregates them by company to make it possible to build a chart (1 company per data series). Orgs query finds orgs with the provided search term in the company name and responds with a map of company uuid -> company info for easy access by uuid on the frontend.

Left out of scope:
- It would be nice to adjust the mapping to have `raised_amount_usd` as numeric, this would allow for much nicer aggregations, such as total amount raised per company, sorting by round size, etc. But I left it out of scope due to time constraints.
- It would be nice to convert backend to Typescript for consistency, but I scoped it out due to time limitations.

### Frontend

Chart.js is used to visualize funding rounds by company. To showcase the use of both the fundings and the orgs data, short description of the company is included in the funding tooltip.

Storybook setup was created to make it easier to further extend the component (and also to showcase that component implementation supports straightforward dependency injection of data providers).

A jest unit test was set up to test conversion logic of the chartConverter.

Left out of scope:
- Better error handling in case of errors on the backend would be nice, but was left out of scope due to time constraints.
- It would be nice to put backend url into a .env file instead of hardcoded localhost.

## Running locally

For project to work don't forget to copy the secret `.env` file to `/backend/` folder of this project.

Run `yarn dev` in `/backend/` and `yarn start` in `/frontend/` project and go to
[localhost:3000](http://localhost:3000).

Here's how it looks:

![](/example-usage.gif)

Run `yarn storybook` to start storybook, then see stories on [localhost:6006](http://localhost:6006).
