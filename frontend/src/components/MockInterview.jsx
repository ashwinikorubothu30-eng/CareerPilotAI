import React, { useState, useEffect } from 'react';
import { fetchInterviewQuestions, evaluateAnswer } from '../services/api';
import { IconMic, IconSparkles, IconCheckCircle, IconAlertCircle, IconArrowRight, IconRefresh } from './Icons';

export default function MockInterview({ profile }) {
  const [targetRole, setTargetRole] = useState('Full Stack Java & React');
  const [difficulty, setDifficulty] = useState('Mid');
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [evaluation, setEvaluation] = useState(null);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showIdeal, setShowIdeal] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoadingQuestions(true);
    setEvaluation(null);
    setUserAnswer('');
    setShowIdeal(false);
    try {
      const data = await fetchInterviewQuestions(targetRole, difficulty, 5);
      setQuestions(data);
      setCurrentIndex(0);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const currentQ = questions[currentIndex];

  const handleEvaluate = async () => {
    if (!userAnswer.trim() || !currentQ) return;
    setEvaluating(true);
    try {
      const res = await evaluateAnswer(
        Date.now(),
        currentQ.id,
        currentQ.question,
        userAnswer,
        targetRole,
        difficulty
      );
      setEvaluation(res);
    } catch (err) {
      console.error(err);
      alert('Error evaluating answer. Ensure Spring Boot backend is active.');
    } finally {
      setEvaluating(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setUserAnswer('');
      setEvaluation(null);
      setShowHint(false);
      setShowIdeal(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setUserAnswer('');
      setEvaluation(null);
      setShowHint(false);
      setShowIdeal(false);
    }
  };

  const wordCount = userAnswer.trim() ? userAnswer.trim().split(/\s+/).length : 0;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <span>AI Mock Technical Interview Simulator</span>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
              Live Feedback
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Simulate realistic FAANG & enterprise technical screening rounds with instant AI grading and STAR method coaching.
          </p>
        </div>

        <button
          onClick={loadQuestions}
          className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition self-start sm:self-auto flex items-center gap-1.5"
        >
          <IconRefresh className="w-3.5 h-3.5" />
          <span>New Session</span>
        </button>
      </div>

      {/* Role & Difficulty Selectors */}
      <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap gap-4 items-center justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Interview Track</label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Full Stack Java & React">Full Stack Java & React</option>
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
            </select>
          </div>

          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Target Seniority</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              <option value="Junior">Junior Engineer (Level 1)</option>
              <option value="Mid">Mid Engineer (Level 2/3)</option>
              <option value="Senior">Senior / Tech Lead (Level 4+)</option>
            </select>
          </div>
        </div>

        {questions.length > 0 && (
          <div className="text-xs text-slate-400">
            Question <strong className="text-white">{currentIndex + 1}</strong> of <strong className="text-white">{questions.length}</strong>
          </div>
        )}
      </div>

      {/* Question Card */}
      {loadingQuestions ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          <div className="w-6 h-6 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mx-auto mb-2"></div>
          Generating curated interview scenario...
        </div>
      ) : currentQ ? (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                {currentQ.category} Round
              </span>
              <button
                onClick={() => setShowHint(!showHint)}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                {showHint ? 'Hide Hint' : '💡 Show Architectural Hint'}
              </button>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
              {currentQ.question}
            </h2>

            {showHint && (
              <div className="p-3.5 rounded-xl bg-indigo-950/40 border border-indigo-800/40 text-xs text-indigo-200 leading-relaxed">
                <strong className="text-indigo-300">Interviewer Expectation: </strong>
                {currentQ.hint}
              </div>
            )}

            {/* Answer Input */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Your Technical Response:</span>
                <span className={wordCount < 40 ? 'text-amber-400' : 'text-emerald-400'}>
                  {wordCount} words {wordCount < 40 && '(Aim for 60+ words for full depth)'}
                </span>
              </div>
              <textarea
                rows={7}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Explain the concepts, architectural trade-offs, and cite a concrete production example..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-xs text-slate-200 leading-relaxed font-sans focus:outline-none focus:border-indigo-500"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs disabled:opacity-30 transition"
                >
                  Previous
                </button>
                <button
                  onClick={handleNext}
                  disabled={currentIndex === questions.length - 1}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs disabled:opacity-30 transition"
                >
                  Next
                </button>
              </div>

              <button
                onClick={handleEvaluate}
                disabled={evaluating || !userAnswer.trim()}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs tracking-wide shadow-lg shadow-purple-600/30 flex items-center gap-2 transition disabled:opacity-40"
              >
                {evaluating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Scoring Answer...</span>
                  </>
                ) : (
                  <>
                    <IconSparkles className="w-4 h-4" />
                    <span>Evaluate with AI Rubric</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Evaluation Results */}
          {evaluation && (
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border border-purple-800/40 space-y-5 animate-in fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center shrink-0">
                    <span className="text-xl font-black text-white">{evaluation.score}</span>
                    <span className="text-[9px] uppercase font-bold text-slate-400">/ 100</span>
                  </div>
                  <div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      evaluation.score >= 80 
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' 
                        : evaluation.score >= 65 
                        ? 'bg-indigo-500/10 text-indigo-300 border border-indigo-500/20' 
                        : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                    }`}>
                      {evaluation.grade}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-1">Interviewer Feedback</h3>
                  </div>
                </div>

                <button
                  onClick={() => setShowIdeal(!showIdeal)}
                  className="text-xs font-semibold text-purple-400 hover:text-purple-300 self-start sm:self-auto"
                >
                  {showIdeal ? 'Hide Model Answer' : '✨ View Ideal Senior Answer'}
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {evaluation.feedback}
              </p>

              {/* Strengths & Missing Aspects */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <IconCheckCircle className="w-4 h-4" />
                    <span>Identified Strengths</span>
                  </span>
                  <ul className="space-y-1">
                    {evaluation.strengths?.map((s, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 uppercase tracking-wider">
                    <IconAlertCircle className="w-4 h-4" />
                    <span>Areas to Elevate (Senior Signals)</span>
                  </span>
                  <ul className="space-y-1">
                    {evaluation.missingAspects?.map((m, i) => (
                      <li key={i} className="text-xs text-slate-300 flex items-start gap-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* STAR Tip */}
              <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/30 text-xs text-purple-200">
                <strong className="text-purple-300">STAR Method Coaching: </strong>
                {evaluation.starMethodFeedback}
              </div>

              {/* Ideal Answer */}
              {showIdeal && (
                <div className="p-4 rounded-xl bg-slate-950 border border-indigo-800/40 space-y-2">
                  <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                    Senior Engineer Model Answer:
                  </div>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    {evaluation.sampleAnswer}
                  </p>
                </div>
              )}

              {/* Next Question Shortcut */}
              {currentIndex < questions.length - 1 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow"
                  >
                    <span>Proceed to Next Question</span>
                    <IconArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 text-xs">No questions loaded.</div>
      )}

    </div>
  );
}
