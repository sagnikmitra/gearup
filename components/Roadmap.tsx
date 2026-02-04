import React from 'react';
import { CheckCircle2, Circle, TrendingUp, AlertTriangle } from 'lucide-react';

const Roadmap: React.FC = () => {
  const steps = [
    {
      phase: "Phase 1: Setup & Launch",
      time: "Month 1-3 (Apr 26 - Jun 26)",
      status: "critical",
      description: "Establish infrastructure, secure licenses, and start initial operations.",
      items: ["CAPEX Deployment (₹15.25L)", "Hiring Staff (Mechanics, Helper)", "GST & Trade License Registration", "Marketing Launch"],
      cashState: "Negative Cash Flow (Burn Rate High)"
    },
    {
      phase: "Phase 2: Stabilization",
      time: "Month 4-12 (Jul 26 - Mar 27)",
      status: "warning",
      description: "Ramp up to 9-14 bikes/day. Focus on customer retention.",
      items: ["Reach 14 Bikes/Day target", "Optimize Inventory (Parts/Oil)", "Cash flow bottoms out (~ Month 12)", "Establish Banking Relationships"],
      cashState: "Lowest Cash Point: -₹12.9L (Requires Working Capital)"
    },
    {
      phase: "Phase 3: Growth",
      time: "Year 2 (Apr 27 - Mar 28)",
      status: "process",
      description: "Steady state operations. PBT turns consistently positive.",
      items: ["Ramp to 19 Bikes/Day", "First full year of Profit", "Start paying Advance Tax", "Recover initial losses"],
      cashState: "Positive Monthly Cash Flow"
    },
    {
      phase: "Phase 4: Scale",
      time: "Year 3 (Apr 28 - Mar 29)",
      status: "success",
      description: "High volume operations. Full capacity utilization.",
      items: ["Reach 29 Bikes/Day (Max Capacity)", "Generate ₹37L Annual PBT", "Consider Expansion/Renovation", "Recover Security Deposit"],
      cashState: "Cash Surplus > ₹80 Lakhs"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Business Roadmap & Execution Plan</h3>
      <div className="relative border-l-2 border-slate-200 ml-4 space-y-12">
        {steps.map((step, idx) => (
          <div key={idx} className="relative pl-8">
            <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white ${
              step.status === 'critical' ? 'bg-red-500' : 
              step.status === 'warning' ? 'bg-amber-500' :
              step.status === 'process' ? 'bg-blue-500' : 'bg-emerald-500'
            }`}></div>
            
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-2">
              <div>
                <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded mb-2 ${
                   step.status === 'critical' ? 'bg-red-100 text-red-700' : 
                   step.status === 'warning' ? 'bg-amber-100 text-amber-700' :
                   step.status === 'process' ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
                }`}>
                  {step.time}
                </span>
                <h4 className="text-lg font-bold text-slate-800">{step.phase}</h4>
              </div>
            </div>
            
            <p className="text-slate-600 mb-4">{step.description}</p>
            
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <ul className="space-y-2 mb-4">
                {step.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-slate-400 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              
              <div className="flex items-center gap-2 text-sm font-semibold border-t border-slate-200 pt-3">
                {step.status === 'critical' || step.status === 'warning' ? 
                  <AlertTriangle className="w-4 h-4 text-amber-500" /> : 
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                }
                <span className={step.status === 'success' ? 'text-emerald-700' : 'text-slate-700'}>
                  Cash Status: {step.cashState}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmap;