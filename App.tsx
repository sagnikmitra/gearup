import React, { useState } from 'react';
import { LayoutDashboard, BarChart3, Receipt, CalendarClock, Info, ChevronRight } from 'lucide-react';
import MetricCard from './components/MetricCard';
import { CashFlowChart, RevenueCompositionChart, ProfitabilityChart, GSTChart } from './components/FinancialCharts';
import DataTable from './components/DataTable';
import Roadmap from './components/Roadmap';
import { CAPEX_ITEMS, OPEX_ITEMS, COMPLIANCE_CHECKLIST, RAW_DATA } from './constants';

function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'financials' | 'tax' | 'assumptions'>('dashboard');

  // KPI Calculations
  const finalCash = RAW_DATA[RAW_DATA.length - 1].endingCash;
  const totalRevYear3 = RAW_DATA.filter(d => d.opYear === 3).reduce((acc, curr) => acc + curr.totalRevenue, 0);
  const totalRevYear1 = RAW_DATA.filter(d => d.opYear === 1).reduce((acc, curr) => acc + curr.totalRevenue, 0);
  const minCash = Math.min(...RAW_DATA.map(d => d.endingCash));
  const breakevenMonth = RAW_DATA.find(d => d.netCashflow > 0)?.month || "N/A";

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-8 animate-fade-in">
            {/* KPI Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <MetricCard 
                title="Year 3 Total Revenue" 
                value={`₹${(totalRevYear3/10000000).toFixed(2)} Cr`} 
                subtext={`Vs Yr 1: ₹${(totalRevYear1/100000).toFixed(1)} L`} 
                color="blue"
              />
              <MetricCard 
                title="Ending Cash Balance" 
                value={`₹${(finalCash/100000).toFixed(1)} L`} 
                subtext="After 36 Months" 
                color="green" 
              />
              <MetricCard 
                title="Minimum Cash Low" 
                value={`-₹${(Math.abs(minCash)/100000).toFixed(1)} L`} 
                subtext="Requires Working Capital" 
                color="red" 
              />
              <MetricCard 
                title="Cash Positive Month" 
                value={breakevenMonth} 
                subtext="First month with +Cashflow" 
                color="amber" 
              />
            </div>

            {/* Main Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <CashFlowChart />
              <ProfitabilityChart />
            </div>

            {/* Roadmap Section */}
            <Roadmap />
          </div>
        );
      case 'financials':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
               <RevenueCompositionChart />
               <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Monthly OPEX Breakdown</h3>
                  <div className="space-y-3">
                    {OPEX_ITEMS.map((item, idx) => (
                       <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2 last:border-0">
                         <span className="text-slate-600">{item.item}</span>
                         <span className="font-semibold text-slate-900">₹{item.cost.toLocaleString('en-IN')}</span>
                       </div>
                    ))}
                  </div>
               </div>
            </div>
            <DataTable />
          </div>
        );
      case 'tax':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm mb-6">
               <h3 className="text-xl font-bold text-slate-800 mb-2">GST & Tax Implications</h3>
               <p className="text-slate-600">
                 The business accumulates significant Input Tax Credit (ITC) from CAPEX in the first month (approx ₹2.2L). 
                 Net GST becomes payable once this ITC is exhausted. Income tax is estimated based on PBT.
               </p>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GSTChart />
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                   <h3 className="text-lg font-bold text-slate-800 mb-6">Compliance Checklist</h3>
                   <div className="space-y-4">
                     {COMPLIANCE_CHECKLIST.map((item, idx) => (
                       <div key={idx} className="flex gap-3">
                         <div className="mt-1 min-w-[20px]">
                           <div className="w-5 h-5 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-bold text-slate-600">
                             {idx + 1}
                           </div>
                         </div>
                         <div>
                           <h4 className="text-sm font-bold text-slate-900">{item.title}</h4>
                           <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                         </div>
                       </div>
                     ))}
                   </div>
                </div>
             </div>
          </div>
        );
      case 'assumptions':
        return (
          <div className="space-y-8 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Capital Expenditure (One-time)</h3>
                  <div className="overflow-hidden rounded-lg border border-slate-100">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50">
                        <tr>
                          <th className="px-4 py-3 text-left font-semibold text-slate-600">Item</th>
                          <th className="px-4 py-3 text-right font-semibold text-slate-600">Cost</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {CAPEX_ITEMS.map((item, idx) => (
                          <tr key={idx} className={item.item === 'Total' ? 'bg-slate-50 font-bold' : ''}>
                            <td className="px-4 py-2 text-slate-700">{item.item}</td>
                            <td className="px-4 py-2 text-right text-slate-900">₹{item.cost.toLocaleString('en-IN')}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Key Operating Assumptions</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                      <h4 className="font-bold text-blue-900 text-sm mb-1">Volume Ramp Up</h4>
                      <p className="text-xs text-blue-800">
                        Starts at 4.5 bikes/day (Year 1 Start) → 14 bikes/day (Year 1 End) → 29 bikes/day (Year 3).
                      </p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                      <h4 className="font-bold text-emerald-900 text-sm mb-1">Margins (Unit Economics)</h4>
                      <p className="text-xs text-emerald-800">
                        Parts Gross Margin: 23.5% <br/>
                        Engine Oil Margin: 20.0% <br/>
                        Labour: 100% Margin
                      </p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                      <h4 className="font-bold text-slate-900 text-sm mb-1">Loan & Inflation</h4>
                      <p className="text-xs text-slate-700">
                        Loan: ₹10 Lakhs @ 12% p.a. <br/>
                        Inflation: 5% on Rent & Salaries from Year 2.
                      </p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900 text-white flex-shrink-0 md:h-screen sticky top-0 overflow-y-auto">
        <div className="p-6 border-b border-slate-800">
          <h1 className="text-2xl font-bold tracking-tight text-white">GearUp</h1>
          <p className="text-xs text-slate-400 mt-1">Service Center Projections</p>
        </div>
        
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium text-sm">Executive Dashboard</span>
          </button>
          
          <button 
             onClick={() => setActiveTab('financials')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'financials' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <BarChart3 size={20} />
            <span className="font-medium text-sm">Detailed Financials</span>
          </button>

          <button 
             onClick={() => setActiveTab('tax')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'tax' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Receipt size={20} />
            <span className="font-medium text-sm">GST & Compliance</span>
          </button>

          <button 
             onClick={() => setActiveTab('assumptions')}
             className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'assumptions' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
          >
            <Info size={20} />
            <span className="font-medium text-sm">Data & Assumptions</span>
          </button>
        </nav>

        <div className="p-6 mt-auto">
           <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
              <h4 className="text-xs font-bold text-slate-300 uppercase mb-2">Project Status</h4>
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 <span className="text-xs text-emerald-400 font-medium">Projection Ready</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed">
                 Based on Bankura, WB location parameters.
              </p>
           </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto h-screen bg-slate-50/50">
        <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-8 py-4 flex justify-between items-center shadow-sm backdrop-blur-sm bg-white/90">
          <div>
            <h2 className="text-xl font-bold text-slate-800">
              {activeTab === 'dashboard' && 'Executive Summary'}https://www.notion.so/2d0a380992cd802b93cff70609f1984e?v=2d0a380992cd808c9716000c8de8d78a&source=copy_link
              {activeTab === 'financials' && 'Detailed Financial Projections'}
              {activeTab === 'tax' && 'Taxation & Compliance'}
              {activeTab === 'assumptions' && 'Model Inputs & CAPEX'}
            </h2>
            <p className="text-sm text-slate-500">36-Month Operating Horizon (Apr 2026 - Mar 2029)</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-3 py-1 bg-slate-100 rounded-md text-xs font-medium text-slate-600 border border-slate-200">
                INR (₹)
             </div>
             <div className="px-3 py-1 bg-blue-50 rounded-md text-xs font-medium text-blue-700 border border-blue-100">
                FY 26-29
             </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;