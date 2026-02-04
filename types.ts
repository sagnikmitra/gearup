export interface MonthlyData {
  id: number;
  month: string;
  year: number;
  opYear: number;
  bikesPerDay: number;
  workingDays: number;
  bikesPerMonth: number;
  
  // Revenue (Ex-GST)
  partsRevenue: number;
  oilRevenue: number;
  labourRevenue: number;
  serviceRevenue: number;
  totalRevenue: number;
  
  // COGS
  partsCOGS: number;
  oilCOGS: number;
  totalCOGS: number;
  grossProfit: number;
  
  // Expenses
  opex: number;
  depreciation: number;
  interest: number;
  pbt: number; // Profit Before Tax
  
  // GST
  outputGST: number;
  inputGST: number;
  netGSTPayable: number;
  
  // Cash Flow
  emi: number;
  capex: number;
  advanceTax: number;
  netCashflow: number;
  endingCash: number;
}

export interface KPIMetrics {
  totalRevenue3Years: number;
  totalProfit3Years: number;
  minCashBalance: number;
  breakEvenMonth: string;
  roi: number;
  totalCapex: number;
}