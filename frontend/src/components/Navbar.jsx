import React from 'react';
import { IconSparkles, IconCompass } from './Icons';

export default function Navbar({ profile, isBackendHealthy }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/25">
            <IconCompass className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-white font-sans">
                CareerPilot<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">AI</span>
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Spring Boot + React
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">Intelligent Career Copilot & Interview Simulator</p>
          </div>
        </div>

        {/* Status & Profile */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs">
            <span className={`w-2 h-2 rounded-full ${isBackendHealthy ? 'bg-emerald-400 shadow-sm shadow-emerald-400' : 'bg-amber-400'}`}></span>
            <span className="text-slate-300 font-mono text-[11px]">
              {isBackendHealthy ? 'API: Connected (:8080)' : 'API: Ready'}
            </span>
          </div>

          <div className="flex items-center gap-3 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow">
              {profile?.fullName ? profile.fullName.charAt(0) : 'U'}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-semibold text-slate-200">{profile?.fullName || 'Alex Morgan'}</div>
              <div className="text-[11px] text-slate-400 truncate max-w-[160px]">{profile?.targetRole || 'Full Stack Engineer'}</div>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}
