import React from 'react';
import { RAW_DATA } from '../constants';

const DataTable: React.FC = () => {
  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="p-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Detailed 36-Month Operating Model</h3>
        <span className="text-xs text-slate-500 italic">Scroll horizontally to view full data</span>
      </div>
      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-sm text-right">
          <thead className="bg-slate-100 text-slate-600 font-semibold uppercase text-xs">
            <tr>
              <th className="px-3 py-3 text-left sticky left-0 bg-slate-100 z-10 border-r border-slate-200">Month</th>
              <th className="px-3 py-3 whitespace-nowrap">Bikes/Day</th>
              <th className="px-3 py-3 whitespace-nowrap bg-blue-50">Total Rev</th>
              <th className="px-3 py-3 whitespace-nowrap">Parts Rev</th>
              <th className="px-3 py-3 whitespace-nowrap">Service Rev</th>
              <th className="px-3 py-3 whitespace-nowrap">Total COGS</th>
              <th className="px-3 py-3 whitespace-nowrap">Gross Profit</th>
              <th className="px-3 py-3 whitespace-nowrap">OPEX</th>
              <th className="px-3 py-3 whitespace-nowrap bg-slate-200">PBT</th>
              <th className="px-3 py-3 whitespace-nowrap text-red-600">GST Payable</th>
              <th className="px-3 py-3 whitespace-nowrap text-emerald-700 bg-emerald-50">Ending Cash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {RAW_DATA.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-3 py-2 text-left font-medium text-slate-900 sticky left-0 bg-white border-r border-slate-200 z-10">
                  {row.month}
                </td>
                <td className="px-3 py-2 text-slate-600">{row.bikesPerDay}</td>
                <td className="px-3 py-2 font-semibold text-blue-700 bg-blue-50/30">₹{formatMoney(row.totalRevenue)}</td>
                <td className="px-3 py-2 text-slate-500">₹{formatMoney(row.partsRevenue)}</td>
                <td className="px-3 py-2 text-slate-500">₹{formatMoney(row.serviceRevenue)}</td>
                <td className="px-3 py-2 text-slate-500">₹{formatMoney(row.totalCOGS)}</td>
                <td className="px-3 py-2 font-medium text-slate-700">₹{formatMoney(row.grossProfit)}</td>
                <td className="px-3 py-2 text-slate-500">₹{formatMoney(row.opex)}</td>
                <td className={`px-3 py-2 font-bold bg-slate-50 ${row.pbt < 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                  {row.pbt < 0 ? '(' : ''}₹{formatMoney(Math.abs(row.pbt))}{row.pbt < 0 ? ')' : ''}
                </td>
                <td className={`px-3 py-2 ${row.netGSTPayable < 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {row.netGSTPayable < 0 ? 'Refund/Cr' : `₹${formatMoney(row.netGSTPayable)}`}
                </td>
                <td className={`px-3 py-2 font-bold border-l border-slate-100 ${row.endingCash < 0 ? 'text-red-600 bg-red-50' : 'text-emerald-700 bg-emerald-50'}`}>
                  {row.endingCash < 0 ? '-' : ''}₹{formatMoney(Math.abs(row.endingCash))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;