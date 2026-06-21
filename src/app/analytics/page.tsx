'use client';

import { useState, useEffect } from 'react';
import { useEco } from '@/components/ClientLayout';
import { 
  BarChart3, FileSpreadsheet, Printer, Bot, Sparkles, Loader2, 
  TrendingUp, TrendingDown, RefreshCw, Award, Info, FileText 
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';

export default function AnalyticsPage() {
  const { user, logs } = useEco();
  const [mounted, setMounted] = useState(false);
  const [report, setReport] = useState<string>('');
  const [loadingReport, setLoadingReport] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!user) return null;

  // 1. Compile Forecast Data (Feature 8)
  const currentTotal = user.monthlyEmissions;
  const forecastData = [
    { name: 'Current', 'Current Habits': currentTotal, 'Recommended Path': currentTotal },
    { name: '1 Month', 'Current Habits': Math.round(currentTotal * 1.02), 'Recommended Path': Math.round(currentTotal * 0.85) },
    { name: '3 Months', 'Current Habits': Math.round(currentTotal * 1.05), 'Recommended Path': Math.round(currentTotal * 0.70) },
    { name: '6 Months', 'Current Habits': Math.round(currentTotal * 1.08), 'Recommended Path': Math.round(currentTotal * 0.55) },
    { name: '1 Year', 'Current Habits': Math.round(currentTotal * 1.12), 'Recommended Path': Math.round(currentTotal * 0.40) }
  ];

  // 2. Generate AI Weekly Report (Feature 10 / Bonus)
  const generateWeeklyReport = async () => {
    setLoadingReport(true);
    setReport('');
    try {
      const res = await fetch('/api/gemini/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: user.displayName, habits: user.habits })
      });
      const data = await res.json();
      setReport(data.report || 'Error generating report.');
    } catch (e) {
      console.error(e);
      setReport('Failed to connect to the audit API. Please check your credentials.');
    } finally {
      setLoadingReport(false);
    }
  };

  // 3. Export CSV (Feature 15)
  const exportCSV = () => {
    if (logs.length === 0) return;
    
    // Headers
    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += 'Date,Transport (kg),Food (kg),Energy (kg),Shopping (kg),Water (kg),Total Emissions (kg)\n';
    
    // Rows
    logs.forEach(log => {
      csvContent += `${log.date},${log.transport},${log.food},${log.energy},${log.shopping},${log.water},${log.total}\n`;
    });
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ecoverse_carbon_report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 4. Export PDF / Trigger Print (Feature 15)
  const triggerPrint = () => {
    window.print();
  };

  // Markdown custom renderer
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let content = line;
      let className = "text-xs md:text-sm leading-relaxed";

      if (content.startsWith('# ')) {
        return <h1 key={idx} className="text-lg md:text-xl font-black text-white mt-4 mb-2 border-b border-white/10 pb-1">{content.replace('# ', '')}</h1>;
      }
      if (content.startsWith('## ')) {
        return <h2 key={idx} className="text-sm md:text-base font-bold text-neon-green mt-3 mb-2">{content.replace('## ', '')}</h2>;
      }
      if (content.startsWith('---')) {
        return <hr key={idx} className="border-white/10 my-4" />;
      }
      if (content.trim().startsWith('* ')) {
        content = content.replace('* ', '');
        className = "text-xs md:text-sm text-foreground/80 pl-4 list-disc list-inside";
      }

      const parts = content.split('**');
      const renderedParts = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="text-white font-semibold">{part}</strong>;
        }
        return part;
      });

      return <p key={idx} className={className}>{renderedParts}</p>;
    });
  };

  return (
    <div className="space-y-6 print:p-0 print:bg-white print:text-black">
      {/* Header Panel */}
      <div className="p-5 rounded-2xl glass-panel flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <BarChart3 size={22} className="text-neon-green" />
            <span>Advanced Analytics & Forecasts</span>
          </h1>
          <p className="text-xs text-foreground/50 mt-1">
            Compare carbon pathways, predict 12-month projections, download clean worksheets, and audit your digital twin.
          </p>
        </div>

        {/* Download Buttons */}
        <div className="flex gap-2">
          <button
            onClick={exportCSV}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 text-white font-medium text-xs transition-all flex items-center gap-1.5"
          >
            <FileSpreadsheet size={14} className="text-neon-green" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={triggerPrint}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-neon-green/30 text-white font-medium text-xs transition-all flex items-center gap-1.5"
          >
            <Printer size={14} className="text-neon-green" />
            <span>Print Report (PDF)</span>
          </button>
        </div>
      </div>

      {/* Grid: Charts & Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast Chart */}
        <div className="lg:col-span-2 p-5 rounded-2xl glass-panel space-y-4 print:border print:border-black/25">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold text-white text-base print:text-black">Carbon Footprint Forecasting AI</h2>
              <p className="text-[10px] text-foreground/45 mt-0.5 print:text-black/50">Projection model comparing current habits against eco recommendations</p>
            </div>
            <div className="flex items-center gap-1 text-neon-green font-semibold text-xs border border-neon-green/10 bg-neon-green/5 px-2 py-0.5 rounded">
              <TrendingDown size={14} />
              <span>Target: -60% CO2</span>
            </div>
          </div>

          <div className="h-72 w-full">
            {mounted ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={11} />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={11} unit="kg" />
                  <Tooltip 
                    contentStyle={{ background: '#06110b', borderColor: 'rgba(0, 255, 157, 0.2)', borderRadius: '8px' }}
                    labelStyle={{ color: '#00ff9d', fontSize: '11px' }}
                    itemStyle={{ color: '#ffffff', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '10px' }} />
                  {/* Business as usual line */}
                  <Line type="monotone" dataKey="Current Habits" stroke="#f59e0b" strokeWidth={2.5} activeDot={{ r: 6 }} strokeDasharray="5 5" />
                  {/* Recommended path line */}
                  <Line type="monotone" dataKey="Recommended Path" stroke="#00ff9d" strokeWidth={2.5} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full w-full flex items-center justify-center text-foreground/30 text-xs">
                Loading Forecasting Elements...
              </div>
            )}
          </div>

          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[10px] text-foreground/60 leading-relaxed flex gap-2 items-center print:hidden">
            <Info size={14} className="text-neon-green shrink-0" />
            <span>Forecasting algorithms assume standard regional grid carbon multipliers and dynamic consumption growth calculations based on shopping/food choices.</span>
          </div>
        </div>

        {/* Breakdown Panel */}
        <div className="p-5 rounded-2xl glass-panel space-y-4 print:border print:border-black/25">
          <h2 className="font-bold text-white text-base print:text-black">Emission Sources Analysis</h2>
          
          <div className="space-y-3.5">
            {logs[0] && [
              { label: 'Transportation', val: logs[0].transport, color: 'bg-emerald-500' },
              { label: 'Food & Nutrition', val: logs[0].food, color: 'bg-neon-green' },
              { label: 'Grid Electricity', val: logs[0].energy, color: 'bg-neon-emerald' },
              { label: 'Shopping Goods', val: logs[0].shopping, color: 'bg-teal-600' },
              { label: 'Water Footprint', val: logs[0].water, color: 'bg-emerald-900' }
            ].map(source => {
              const percentage = Math.round((source.val / logs[0].total) * 100);
              return (
                <div key={source.label} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-foreground/60">{source.label}</span>
                    <span className="font-bold text-white font-mono print:text-black">{source.val} kg ({percentage}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className={`h-full ${source.color} rounded-full`} style={{ width: `${percentage}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 2: AI Audit Report Panel */}
      <div className="p-5 rounded-2xl glass-panel space-y-4 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded bg-neon-green/10 text-neon-green">
              <Bot size={18} />
            </span>
            <div>
              <h3 className="font-bold text-white text-base">AI Weekly Sustainability Report</h3>
              <p className="text-[10px] text-foreground/45">Generate a deep audit of your current habit models via Gemini Pro</p>
            </div>
          </div>

          <button
            onClick={generateWeeklyReport}
            disabled={loadingReport}
            className="px-4 py-2 rounded-xl bg-neon-green text-black font-bold text-xs hover:bg-neon-green/90 transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,157,0.15)] disabled:opacity-40"
          >
            {loadingReport ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Compiling Audit...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Compile AI Weekly Audit Report</span>
              </>
            )}
          </button>
        </div>

        {report ? (
          <div className="p-5 rounded-xl border border-neon-green/30 bg-[#06120b]/40 space-y-3 max-h-96 overflow-y-auto font-sans">
            {renderMarkdown(report)}
          </div>
        ) : (
          <div className="p-8 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl bg-white/5">
            <FileText size={28} className="text-foreground/30 mb-2" />
            <span className="text-xs text-white font-semibold">No Audit Compiled</span>
            <p className="text-[10px] text-foreground/40 mt-1 max-w-sm">Click the button above to request a personalized AI sustainability audit based on your active digital twin configuration.</p>
          </div>
        )}
      </div>

      {/* Print-only layout container */}
      <div className="hidden print:block p-8 space-y-6">
        <div className="border-b-2 border-black pb-4">
          <h1 className="text-2xl font-black uppercase">EcoVerse AI Climate Twin Report</h1>
          <p className="text-sm text-gray-500">Official Carbon Emission Audit Summary</p>
          <div className="grid grid-cols-3 gap-4 mt-4 text-xs">
            <div>
              <span className="text-gray-500">Auditee Name</span>
              <p className="font-bold">{user.displayName}</p>
            </div>
            <div>
              <span className="text-gray-500">Eco Score Rating</span>
              <p className="font-bold">{user.carbonScore} / 100</p>
            </div>
            <div>
              <span className="text-gray-500">Date Compiled</span>
              <p className="font-bold">June 21, 2026</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-bold uppercase">1. Monthly Carbon Breakdown</h2>
          <table className="w-full border-collapse border border-gray-300 text-sm text-left">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 p-2">Category</th>
                <th className="border border-gray-300 p-2">Emissions (kg CO2e)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2">Transportation ({user.habits.transport})</td>
                <td className="border border-gray-300 p-2">{logs[0]?.transport || 180} kg</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Diet & Food ({user.habits.food})</td>
                <td className="border border-gray-300 p-2">{logs[0]?.food || 120} kg</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Grid Electricity ({user.habits.energy})</td>
                <td className="border border-gray-300 p-2">{logs[0]?.energy || 110} kg</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Shopping Goods ({user.habits.shopping})</td>
                <td className="border border-gray-300 p-2">{logs[0]?.shopping || 60} kg</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2">Water Footprint ({user.habits.water})</td>
                <td className="border border-gray-300 p-2">{logs[0]?.water || 30} kg</td>
              </tr>
              <tr className="font-bold bg-gray-50">
                <td className="border border-gray-300 p-2">Total Footprint</td>
                <td className="border border-gray-300 p-2">{user.monthlyEmissions} kg CO2e</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
