export interface Org {
  uuid: string;
  company_name: string;
  homepage_url: string;
  country_code: string;
  city: string;
  short_description: string;
  description: string;
  funding_rounds: string;
  funding_total_usd: string;
  employee_count: string;
}

export interface Funding {
  funding_round_uuid: string;
  company_uuid: string;
  company_name: string;
  investment_type: string;
  announced_on: string;
  raised_amount_usd: string;
  investor_names: string;
}
