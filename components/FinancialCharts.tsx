import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend, ComposedChart, Line, ReferenceLine, LineChart
} from 'recharts';
import { RAW_DATA } from '../constants';

const formatCurrency = (value: number) => {
  if (Math.abs(value) >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (Math.abs(value) >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (Math.abs(value) >= 1000) return `₹${(value / 1000).toFixed(0)}k`;
  return `₹${value}`;
};

export const CashFlowChart: React.FC = () => {
  // Create a gradient offset for green/red coloring based on zero
  const gradientOffset = () => {
    const dataMax = Math.max(...RAW_DATA.map((i) => i.endingCash));
    const dataMin = Math.min(...RAW_DATA.map((i) => i.endingCash));
    if (dataMax <= 0) return 0;
    if (dataMin >= 0) return 1;
    return dataMax / (dataMax - dataMin);
  };

  const off = gradientOffset();

  return (
    <div className="h-80 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Cash Runway & Balance (36 Months)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={RAW_DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
              <stop offset={off} stopColor="#10b981" stopOpacity={0.7} />
              <stop offset={off} stopColor="#ef4444" stopOpacity={0.7} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{fontSize: 10}} tickMargin={10} stroke="#94a3b8" interval={5} />
          <YAxis tickFormatter={formatCurrency} tick={{fontSize: 10}} stroke="#94a3b8" />
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
          <Area type="monotone" dataKey="endingCash" stroke="#000" fill="url(#splitColor)" strokeWidth={2} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const RevenueCompositionChart: React.FC = () => {
  return (
    <div className="h-80 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue Mix (Parts vs Service)</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={RAW_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{fontSize: 10}} stroke="#94a3b8" interval={5} />
          <YAxis tickFormatter={formatCurrency} tick={{fontSize: 10}} stroke="#94a3b8" />
          <Tooltip 
            formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Bar dataKey="partsRevenue" name="Parts Revenue" stackId="a" fill="#3b82f6" />
          <Bar dataKey="oilRevenue" name="Oil Revenue" stackId="a" fill="#8b5cf6" />
          <Bar dataKey="labourRevenue" name="Labour" stackId="a" fill="#f59e0b" />
          <Bar dataKey="serviceRevenue" name="Service" stackId="a" fill="#10b981" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ProfitabilityChart: React.FC = () => {
  return (
    <div className="h-80 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">Revenue vs Expenses vs PBT</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={RAW_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{fontSize: 10}} stroke="#94a3b8" interval={5} />
          <YAxis tickFormatter={formatCurrency} tick={{fontSize: 10}} stroke="#94a3b8" />
          <Tooltip 
             formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Area type="monotone" dataKey="totalRevenue" name="Total Revenue" fill="#e0f2fe" stroke="#0ea5e9" strokeWidth={2} />
          <Line type="monotone" dataKey="opex" name="OPEX (Fixed)" stroke="#ef4444" strokeWidth={2} dot={false} />
          <Bar dataKey="pbt" name="Profit Before Tax" fill="#10b981" barSize={10} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export const GSTChart: React.FC = () => {
  return (
    <div className="h-80 w-full bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
      <h3 className="text-lg font-bold text-slate-800 mb-4">GST Output vs Input vs Net Payable</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={RAW_DATA} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="month" tick={{fontSize: 10}} stroke="#94a3b8" interval={5} />
          <YAxis tickFormatter={formatCurrency} tick={{fontSize: 10}} stroke="#94a3b8" />
          <Tooltip 
             formatter={(value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)}
             contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
          />
          <Legend />
          <Line type="monotone" dataKey="outputGST" name="Output GST (Collected)" stroke="#3b82f6" strokeWidth={2} dot={false} />
          <Line type="monotone" dataKey="inputGST" name="Input GST (Credit)" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" dot={false} />
          <Line type="monotone" dataKey="netGSTPayable" name="Net Payable (Cash)" stroke="#0f172a" strokeWidth={3} dot={false} />
          <ReferenceLine y={0} stroke="#cbd5e1" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
