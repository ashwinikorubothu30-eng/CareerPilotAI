import React, { useState, useEffect } from 'react';
import { generateRoadmap, fetchRoadmapRoles } from '../services/api';
import { IconMap, IconCheckCircle, IconArrowRight, IconSparkles, IconChevronDown, IconChevronRight } from './Icons';

export default function CareerRoadmap({ profile }) {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState(profile?.targetRole || 'Full Stack Java & React Engineer');
  const [level, setLevel] = useState('Beginner');
  const [weeks, setWeeks] = useState(16);
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);
  const [expandedMilestones, setExpandedMilestones] = useState({});
  const [completedMilestones, setCompletedMilestones] = useState({});

  useEffect(() => {
    loadRolesAndRoadmap();
  }, []);

  const loadRolesAndRoadmap = async () => {
    setLoading(true);
    try {
      const roleList = await fetchRoadmapRoles();
      setRoles(roleList);
      const defaultRole = roleList[0] || 'Full Stack Java & React Engineer';
      setSelectedRole(defaultRole);
      const data = await generateRoadmap(defaultRole, 'Beginner', 16);
      setRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const data = await generateRoadmap(selectedRole, level, weeks);
      setRoadmap(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMilestone = (id) => {
    setExpandedMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleComplete = (id) => {
    setCompletedMilestones(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate overall progress
  let totalMilestones = 0;
  let finishedMilestones = 0;
  if (roadmap?.phases) {
    roadmap.phases.forEach(p => {
      p.milestones?.forEach(m => {
        totalMilestones++;
        if (completedMilestones[m.id]) finishedMilestones++;
      });
    });
  }
  const progressPercent = totalMilestones > 0 ? Math.round((finishedMilestones / totalMilestones) * 100) : 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>AI Career Roadmaps & Milestone Navigator</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Interactive Path
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Personalized architectural learning roadmaps structured from fundamentals to advanced distributed systems.
          </p>
        </div>

        {totalMilestones > 0 && (
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl self-start sm:self-auto">
            <div>
              <div className="text-[10px] text-slate-400 uppercase tracking-wider">Milestones Completed</div>
              <div className="text-xs font-bold text-white">{finishedMilestones} of {totalMilestones} ({progressPercent}%)</div>
            </div>
            <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
              <div className="bg-indigo-500 h-full rounded-full transition-all" style={{ width: `${progressPercent}%` }}></div>
            </div>
          </div>
        )}
      </div>

      {/* Configuration Controls */}
      <div className="p-5 rounded-xl bg-slate-900/80 border border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Target Engineering Role</label>
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            {roles.map((r, i) => (
              <option key={i} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">Experience Baseline</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="Beginner">Junior / Student (Beginner)</option>
            <option value="Intermediate">Mid-level (1-3 Years)</option>
            <option value="Advanced">Senior / Staff Engineer</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Target Timeline: <span className="text-indigo-400 font-bold">{weeks} Weeks</span>
          </label>
          <input
            type="range"
            min={8}
            max={32}
            step={2}
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            className="w-full accent-indigo-500 cursor-pointer"
          />
        </div>

        <div>
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            <IconSparkles className="w-3.5 h-3.5" />
            <span>{loading ? 'Generating...' : 'Regenerate Path'}</span>
          </button>
        </div>
      </div>

      {/* Roadmap Content */}
      {roadmap && (
        <div className="space-y-6">
          
          {/* Overview Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 via-slate-900 to-slate-900 border border-indigo-800/40">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Career Spec</span>
                <h2 className="text-xl font-bold text-white mt-0.5">{roadmap.roleTitle}</h2>
                <p className="mt-2 text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {roadmap.careerOverview}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 shrink-0 text-center md:text-right">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider">Avg Market Compensation</div>
                <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">
                  ${roadmap.expectedMarketSalary ? roadmap.expectedMarketSalary.toLocaleString() : '120,000'} / yr
                </div>
                <div className="text-[10px] text-slate-400 mt-1">Based on US Tech Index</div>
              </div>
            </div>

            {/* Essential Tools */}
            <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Core Stack:</span>
              {roadmap.essentialTools?.map((tool, idx) => (
                <span key={idx} className="text-[11px] px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Phases & Milestones Accordion */}
          <div className="space-y-4">
            {roadmap.phases?.map((phase, pIdx) => (
              <div key={pIdx} className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden">
                <div className="p-4 bg-slate-850/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {phase.phaseNumber}
                    </span>
                    <h3 className="text-sm font-bold text-white">{phase.phaseName}</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 self-start sm:self-auto">
                    {phase.duration}
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-xs text-slate-400 mb-4">{phase.objective}</p>

                  <div className="space-y-3">
                    {phase.milestones?.map((milestone) => {
                      const isExpanded = !!expandedMilestones[milestone.id];
                      const isDone = !!completedMilestones[milestone.id];

                      return (
                        <div 
                          key={milestone.id}
                          className={`rounded-xl border transition-all ${
                            isDone 
                              ? 'bg-slate-950/40 border-emerald-900/40' 
                              : 'bg-slate-950/80 border-slate-800/80 hover:border-slate-700'
                          }`}
                        >
                          <div className="p-3.5 flex items-center justify-between gap-3 cursor-pointer" onClick={() => toggleMilestone(milestone.id)}>
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleComplete(milestone.id);
                                }}
                                className={`w-5 h-5 rounded-md border flex items-center justify-center transition ${
                                  isDone
                                    ? 'bg-emerald-500 border-emerald-400 text-white'
                                    : 'border-slate-700 bg-slate-900 hover:border-indigo-500'
                                }`}
                              >
                                {isDone && <span className="text-xs font-bold">✓</span>}
                              </button>
                              <div>
                                <h4 className={`text-xs font-semibold ${isDone ? 'line-through text-slate-500' : 'text-slate-200'}`}>
                                  {milestone.title}
                                </h4>
                                <p className="text-[11px] text-slate-400 line-clamp-1">{milestone.description}</p>
                              </div>
                            </div>

                            <button className="text-slate-400 hover:text-white p-1">
                              {isExpanded ? <IconChevronDown className="w-4 h-4" /> : <IconChevronRight className="w-4 h-4" />}
                            </button>
                          </div>

                          {/* Expanded Details */}
                          {isExpanded && (
                            <div className="px-4 pb-4 pt-1 border-t border-slate-800/60 space-y-3 text-xs">
                              <div>
                                <span className="text-slate-400 font-semibold block mb-1">Key Technologies:</span>
                                <div className="flex flex-wrap gap-1">
                                  {milestone.skillsToLearn?.map((s, i) => (
                                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                                      {s}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <span className="text-slate-400 font-semibold block mb-1">Recommended Hands-on Project:</span>
                                <ul className="list-disc list-inside text-indigo-300 space-y-0.5">
                                  {milestone.recommendedProjects?.map((p, i) => (
                                    <li key={i}>{p}</li>
                                  ))}
                                </ul>
                              </div>

                              <div>
                                <span className="text-slate-400 font-semibold block mb-1">Authoritative Guides & Docs:</span>
                                <div className="flex flex-wrap gap-2 text-slate-300">
                                  {milestone.learningResources?.map((r, i) => (
                                    <span key={i} className="text-[11px] text-slate-400 underline decoration-slate-700">
                                      📚 {r}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}

