import React from 'react';
import { IconCompass, IconFileText, IconMap, IconMic, IconBriefcase } from './Icons';

export default function Sidebar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Career Dashboard', icon: IconCompass, badge: 'Overview' },
    { id: 'resume', label: 'Resume ATS Optimizer', icon: IconFileText, badge: 'AI Scanner' },
    { id: 'roadmap', label: 'Career Roadmaps', icon: IconMap, badge: 'Phases' },
    { id: 'interview', label: 'Mock Tech Interview', icon: IconMic, badge: 'Live Prep' },
    { id: 'jobs', label: 'Job Matching & Skills', icon: IconBriefcase, badge: 'Matches' },
  ];

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/60 p-4 shrink-0">
      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-3 mb-2 hidden md:block">
        Navigation
      </div>
      <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              <span
                className={`hidden lg:inline-block text-[10px] px-1.5 py-0.5 rounded-md font-mono ${
                  isActive
                    ? 'bg-indigo-900/60 text-indigo-200'
                    : 'bg-slate-800/80 text-slate-400'
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="hidden md:block mt-8 p-3 rounded-xl bg-gradient-to-br from-indigo-950/50 to-slate-900 border border-indigo-800/30">
        <div className="text-xs font-semibold text-indigo-300 mb-1 flex items-center gap-1.5">
          <span>⚡</span>
          <span>Pro Career Tip</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          Use the <strong>XYZ bullet formula</strong>: "Accomplished [X] measured by [Y] doing [Z]" to increase interview callbacks by 3.2x.
        </p>
      </div>
    </aside>
  );
}
