import React, { useState } from 'react';
import { analyzeResume, improveBullet } from '../services/api';
import { IconSparkles, IconCheckCircle, IconAlertCircle, IconRefresh, IconArrowRight, IconZap } from './Icons';

const SAMPLE_RESUME = `Alex Morgan
alex.morgan@example.com | (555) 234-5678 | San Francisco, CA | github.com/alexmorgan

SUMMARY
Dedicated Full Stack Software Engineer with 3+ years experience building web applications with Java, Spring Boot, and React. Passionate about clean code, RESTful architecture, and cloud deployment.

WORK EXPERIENCE
Software Developer | TechNova Solutions | June 2023 - Present
- Worked on backend APIs using Spring Boot and handled database queries.
- Helped team build the frontend in React and fixed bugs.
- Deployed microservices using Docker and monitored application performance.
- Participated in agile sprint ceremonies and reviewed code pull requests.

Junior Developer | ByteCraft Inc | Aug 2021 - May 2023
- Built internal admin dashboards using React and JavaScript.
- Wrote unit tests using JUnit and Mockito to improve code quality.
- Maintained SQL queries in MySQL database and resolved schema migrations.

TECHNICAL SKILLS
Languages: Java 21, JavaScript, TypeScript, SQL, HTML5, CSS3
Frameworks & Libraries: Spring Boot, Spring Data JPA, React, Redux, Tailwind CSS
Tools & Cloud: Git, Docker, Postman, Maven, Linux, AWS EC2

EDUCATION
B.S. in Computer Science | State University | Graduated May 2021`;

export default function ResumeOptimizer({ profile }) {
  const [resumeText, setResumeText] = useState(SAMPLE_RESUME);
  const [targetRole, setTargetRole] = useState(profile?.targetRole || 'Full Stack Engineer');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Bullet Enhancer State
  const [customBullet, setCustomBullet] = useState('Worked on backend APIs using Spring Boot and handled database queries.');
  const [enhancedResult, setEnhancedResult] = useState(null);
  const [enhancing, setEnhancing] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setLoading(true);
    try {
      const data = await analyzeResume(resumeText, targetRole, jobDescription);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert('Error analyzing resume. Please make sure the Spring Boot backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleEnhanceBullet = async () => {
    if (!customBullet.trim()) return;
    setEnhancing(true);
    try {
      const data = await improveBullet(customBullet, targetRole);
      setEnhancedResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setEnhancing(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>AI Resume Optimizer & ATS Scanner</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              NLP Engine
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate enterprise Applicant Tracking Systems (ATS) to identify missing keywords, strengthen action verbs, and apply the XYZ formula.
          </p>
        </div>

        <button
          onClick={() => setResumeText(SAMPLE_RESUME)}
          className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition self-start sm:self-auto flex items-center gap-1.5"
        >
          <IconRefresh className="w-3.5 h-3.5" />
          <span>Load Tech Sample</span>
        </button>
      </div>

      {/* Input Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Editor */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-xs font-semibold text-slate-300 mb-1">Target Job Role</label>
              <select
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Full Stack Engineer">Full Stack Engineer (Java / React)</option>
                <option value="Backend Developer">Backend Developer (Java / Spring / Microservices)</option>
                <option value="Frontend Developer">Frontend Developer (React / Next.js)</option>
                <option value="Cloud & DevOps Engineer">Cloud & DevOps Engineer (AWS / K8s)</option>
                <option value="Data Scientist / AI Engineer">Data Scientist / AI Engineer (Python / ML)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Resume Content (Markdown / Plain Text)</label>
            <textarea
              rows={12}
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume content here..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Target Job Description (Optional — for direct keyword gap comparison)
            </label>
            <textarea
              rows={3}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the target job description to match against specific requirements..."
              className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-3 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Scanning ATS Keywords & Impact Metrics...</span>
              </>
            ) : (
              <>
                <IconSparkles className="w-4 h-4" />
                <span>Run Full AI ATS Analysis</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Quick Bullet Enhancer Tool */}
        <div className="space-y-4">
          <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                <IconZap className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live Bullet Enhancer</h3>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Transform weak responsibilities into high-impact Google XYZ achievement statements.
            </p>

            <textarea
              rows={3}
              value={customBullet}
              onChange={(e) => setCustomBullet(e.target.value)}
              placeholder="e.g. Worked on database queries..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            />

            <button
              onClick={handleEnhanceBullet}
              disabled={enhancing}
              className="w-full py-2 rounded-lg bg-indigo-600/80 hover:bg-indigo-600 text-white text-xs font-semibold transition flex items-center justify-center gap-1.5"
            >
              <IconSparkles className="w-3.5 h-3.5" />
              <span>{enhancing ? 'Enhancing...' : 'Enhance with Metrics'}</span>
            </button>

            {enhancedResult && (
              <div className="p-3.5 rounded-lg bg-indigo-950/40 border border-indigo-800/40 space-y-2 mt-2">
                <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">AI Improved Bullet:</div>
                <div className="text-xs text-slate-200 font-medium leading-relaxed">
                  "{enhancedResult.improved}"
                </div>
                <div className="text-[10px] text-slate-400 pt-1 border-t border-indigo-900/40 flex items-center justify-between">
                  <span>Power Verb: <strong className="text-emerald-400">{enhancedResult.actionVerb}</strong></span>
                  <span>Impact: <strong className="text-indigo-300">Measured</strong></span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Analysis Results Display */}
      {result && (
        <div className="mt-8 space-y-6 pt-6 border-t border-slate-800">
          
          {/* Top Score Summary Banner */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-800/40 flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-28 h-28 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-slate-800"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-indigo-500 transition-all duration-1000 ease-out"
                  strokeDasharray={`${result.atsScore}, 100`}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-white">{result.atsScore}</span>
                <span className="text-[10px] uppercase font-bold text-indigo-400">ATS Score</span>
              </div>
            </div>

            <div className="space-y-1.5 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-xs font-semibold">
                <span>Evaluated for: {result.detectedRole}</span>
              </div>
              <h3 className="text-lg font-bold text-white">ATS Parsing Assessment</h3>
              <p className="text-xs text-slate-300 leading-relaxed max-w-3xl">
                {result.scoreSummary}
              </p>
            </div>
          </div>

          {/* Breakdown Gauges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {result.scoreBreakdown && Object.entries(result.scoreBreakdown).map(([key, score], idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                <div className="text-[11px] text-slate-400">{key}</div>
                <div className="mt-1 text-xl font-bold text-white">{score}%</div>
                <div className="mt-2 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-indigo-500 h-full rounded-full"
                    style={{ width: `${score}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Keywords Comparison: Found vs Missing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Matched */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <IconCheckCircle className="w-4 h-4" />
                  <span>Found Competencies ({result.matchedSkills?.length || 0})</span>
                </span>
                <span className="text-[10px] text-slate-400">Indexed by ATS</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.matchedSkills?.map((s, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-mono">
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Missing */}
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-400 flex items-center gap-1.5 uppercase tracking-wider">
                  <IconAlertCircle className="w-4 h-4" />
                  <span>Missing High-Yield Keywords ({result.missingSkills?.length || 0})</span>
                </span>
                <span className="text-[10px] text-slate-400">Add to Resume</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {result.missingSkills?.map((s, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono">
                    + {s}
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* Action Verbs & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <IconSparkles className="w-4 h-4 text-indigo-400" />
                <span>Recommended Engineering Action Verbs</span>
              </h4>
              <p className="text-xs text-slate-400">
                Start bullet points with these authoritative verbs rather than "helped" or "worked on":
              </p>
              <div className="flex flex-wrap gap-2">
                {result.actionVerbSuggestions?.map((v, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <span>Key ATS Formatting Warnings</span>
              </h4>
              {result.formatIssues?.length === 0 ? (
                <div className="text-xs text-emerald-400 flex items-center gap-2">
                  <IconCheckCircle className="w-4 h-4" />
                  <span>Clean standard section headers detected. Good job!</span>
                </div>
              ) : (
                <ul className="space-y-1.5">
                  {result.formatIssues?.map((f, i) => (
                    <li key={i} className="text-xs text-amber-300 flex items-start gap-2">
                      <span className="text-amber-400 mt-0.5">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
