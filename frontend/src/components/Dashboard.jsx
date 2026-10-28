import React from 'react';
import { IconSparkles, IconFileText, IconMap, IconMic, IconBriefcase, IconCheckCircle, IconArrowRight, IconZap } from './Icons';

export default function Dashboard({ profile, setActiveTab }) {
  const readiness = profile?.readinessScore || 78;
  const ats = profile?.atsScore || 74;

  const quickStats = [
    { label: 'ATS Resume Score', value: `${ats}/100`, badge: '+8% vs benchmark', color: 'from-indigo-500 to-indigo-600' },
    { label: 'Role Alignment', value: profile?.targetRole ? '86%' : '80%', badge: 'Strong Fit', color: 'from-purple-500 to-purple-600' },
    { label: 'Roadmap Milestone', value: 'Phase 2 / 4', badge: 'Active Progress', color: 'from-pink-500 to-rose-600' },
    { label: 'Tech Interview Rating', value: 'Level 3 Mid', badge: 'Ready for Screen', color: 'from-emerald-500 to-teal-600' },
  ];

  return (
    <div className="space-y-6">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-900 border border-indigo-800/40 p-6 md:p-8">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-xs font-semibold mb-3">
            <IconSparkles className="w-3.5 h-3.5" />
            <span>AI Career Engine Active</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">{profile?.fullName || 'Alex'}</span>!
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Your target path is <strong className="text-white">{profile?.targetRole || 'Full Stack Java & React Engineer'}</strong>. Complete your resume optimization and take a 5-question mock interview to boost your market readiness.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('resume')}
              className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition"
            >
              <IconFileText className="w-4 h-4" />
              <span>Optimize Resume with AI</span>
            </button>
            <button
              onClick={() => setActiveTab('interview')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-2 transition"
            >
              <IconMic className="w-4 h-4 text-purple-400" />
              <span>Launch Mock Interview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickStats.map((stat, idx) => (
          <div key={idx} className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition">
            <div>
              <div className="text-xs font-medium text-slate-400">{stat.label}</div>
              <div className="mt-2 text-2xl font-bold text-white tracking-tight">{stat.value}</div>
            </div>
            <div className="mt-3">
              <span className="text-[11px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-md border border-indigo-500/20">
                {stat.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Two Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Quick Action Hub */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <IconZap className="w-4 h-4 text-amber-400" />
              <span>Interactive Action Modules</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Action 1 */}
            <div 
              onClick={() => setActiveTab('resume')}
              className="cursor-pointer group p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-slate-850 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <IconFileText className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition">Resume ATS Scanner</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Check keyword density, detect missing competencies, and generate XYZ bullet point rewrites.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-indigo-400 font-semibold">
                <span>Scan Resume</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Action 2 */}
            <div 
              onClick={() => setActiveTab('interview')}
              className="cursor-pointer group p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-purple-500/50 hover:bg-slate-850 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <IconMic className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-purple-300 transition">AI Mock Interview</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Practice technical & behavioral questions with real-time AI scoring, STAR feedback, and ideal answers.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-purple-400 font-semibold">
                <span>Start Session</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Action 3 */}
            <div 
              onClick={() => setActiveTab('roadmap')}
              className="cursor-pointer group p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-pink-500/50 hover:bg-slate-850 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <IconMap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-pink-300 transition">Roadmap & Milestones</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Step-by-step career path with suggested capstone projects and authoritative learning resources.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-pink-400 font-semibold">
                <span>Explore Path</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

            {/* Action 4 */}
            <div 
              onClick={() => setActiveTab('jobs')}
              className="cursor-pointer group p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-850 transition"
            >
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mb-3 group-hover:scale-105 transition">
                <IconBriefcase className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-emerald-300 transition">Job Match & Skill Gaps</h3>
              <p className="mt-1 text-xs text-slate-400 leading-relaxed">
                Instant percentage matching against verified listings with personalized skill closing suggestions.
              </p>
              <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                <span>View Matches</span>
                <IconArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </div>
            </div>

          </div>
        </div>

        {/* Right Column: Profile & Skill Competencies */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-white">Target Competency Tags</h2>

          <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-4">
            <div>
              <div className="text-xs text-slate-400 mb-2">Verified Skill Stack:</div>
              <div className="flex flex-wrap gap-1.5">
                {['Java 21', 'Spring Boot', 'React 19', 'PostgreSQL', 'Docker', 'REST APIs', 'Git', 'Tailwind'].map((s, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-slate-800 text-slate-200 border border-slate-700/60 font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="text-xs text-slate-400 mb-2">Next Priority Skills to Unlock:</div>
              <div className="flex flex-wrap gap-1.5">
                {['Apache Kafka', 'Redis Caching', 'Kubernetes Helm', 'System Design'].map((s, i) => (
                  <span key={i} className="text-[11px] px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 font-mono">
                    +{s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-300">Overall Readiness Index</span>
                <span className="font-bold text-indigo-400">{readiness}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${readiness}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

