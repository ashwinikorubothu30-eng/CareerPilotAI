import React, { useState, useEffect } from 'react';
import { matchJobs } from '../services/api';
import { IconBriefcase, IconCheckCircle, IconAlertCircle, IconSparkles, IconRefresh, IconArrowRight } from './Icons';

export default function JobBoard({ profile }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userSkillsStr, setUserSkillsStr] = useState(
    profile?.skills || 'Java, Spring Boot, React, JavaScript, SQL, Git, REST API, Docker'
  );
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    loadMatchedJobs();
  }, []);

  const loadMatchedJobs = async () => {
    setLoading(true);
    try {
      const skillsArray = userSkillsStr.split(',').map(s => s.trim()).filter(Boolean);
      const data = await matchJobs(skillsArray, profile?.targetRole || '', 2);
      setJobs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = roleFilter
    ? jobs.filter(j => j.title.toLowerCase().includes(roleFilter.toLowerCase()) || j.company.toLowerCase().includes(roleFilter.toLowerCase()))
    : jobs;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>Job Matching & Skill Gap Analyzer</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Algorithmic Scoring
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Compare your active skillset against top market job postings to calculate match probabilities and priority missing skills.
          </p>
        </div>

        <button
          onClick={loadMatchedJobs}
          className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition self-start sm:self-auto flex items-center gap-1.5"
        >
          <IconRefresh className="w-3.5 h-3.5" />
          <span>Recalculate Matches</span>
        </button>
      </div>

      {/* Skills Configuration Bar */}
      <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex-1">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Your Current Verified Skills (Comma-separated)
            </label>
            <input
              type="text"
              value={userSkillsStr}
              onChange={(e) => setUserSkillsStr(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button
            onClick={loadMatchedJobs}
            disabled={loading}
            className="md:mt-5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition flex items-center justify-center gap-2"
          >
            <IconSparkles className="w-3.5 h-3.5" />
            <span>Update Matches</span>
          </button>
        </div>

        {/* Filter */}
        <div className="pt-2 flex items-center gap-2">
          <input
            type="text"
            placeholder="Search listings by title or company..."
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-indigo-500 max-w-sm w-full"
          />
        </div>
      </div>

      {/* Jobs Listing Grid */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          <div className="w-6 h-6 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin mx-auto mb-2"></div>
          Calculating real-time skill overlap and market fit...
        </div>
      ) : filteredJobs.length > 0 ? (
        <div className="space-y-4">
          {filteredJobs.map((job) => {
            const isHighMatch = job.matchScore >= 80;
            const isMediumMatch = job.matchScore >= 60;

            return (
              <div
                key={job.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-white">{job.title}</h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {job.jobType}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-400">
                      <span className="font-semibold text-slate-300">{job.company}</span>
                      <span>•</span>
                      <span>{job.location}</span>
                      <span>•</span>
                      <span className="font-mono text-emerald-400 font-semibold">{job.salaryRange}</span>
                    </div>
                  </div>

                  {/* Match Score Badge */}
                  <div className="flex items-center gap-3 self-start sm:self-auto shrink-0">
                    <div className="text-right">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Candidate Match</div>
                      <div className={`text-xl font-black font-mono ${
                        isHighMatch ? 'text-emerald-400' : isMediumMatch ? 'text-indigo-400' : 'text-amber-400'
                      }`}>
                        {job.matchScore}%
                      </div>
                    </div>
                    <div className={`w-3 h-12 rounded-full ${
                      isHighMatch ? 'bg-emerald-500' : isMediumMatch ? 'bg-indigo-500' : 'bg-amber-500'
                    }`}></div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {job.description}
                </p>

                {/* Skill Overlap Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  {/* Matched */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-emerald-400 flex items-center gap-1 uppercase tracking-wider">
                      <IconCheckCircle className="w-3.5 h-3.5" />
                      <span>Matching Verified Skills ({job.matchedSkills?.length || 0})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.matchedSkills?.map((s, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                          ✓ {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Missing */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-rose-400 flex items-center gap-1 uppercase tracking-wider">
                      <IconAlertCircle className="w-3.5 h-3.5" />
                      <span>Skill Gaps ({job.missingSkills?.length || 0})</span>
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {job.missingSkills?.length === 0 ? (
                        <span className="text-xs text-emerald-400">Zero skill gaps detected! Fully qualified.</span>
                      ) : (
                        job.missingSkills?.map((s, i) => (
                          <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono">
                            + {s}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendation Box */}
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-emerald-400 mt-0.5">🎯</span>
                  <div>
                    <strong className="text-white">AI Application Strategy: </strong>
                    {job.recommendation}
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 text-xs">No matching jobs found for criteria.</div>
      )}

    </div>
  );
}
