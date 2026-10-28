import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ResumeOptimizer from './components/ResumeOptimizer';
import CareerRoadmap from './components/CareerRoadmap';
import MockInterview from './components/MockInterview';
import JobBoard from './components/JobBoard';
import { fetchProfile } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [profile, setProfile] = useState(null);
  const [isBackendHealthy, setIsBackendHealthy] = useState(false);

  useEffect(() => {
    checkHealthAndLoadProfile();
  }, []);

  const checkHealthAndLoadProfile = async () => {
    const prof = await fetchProfile();
    if (prof) {
      setProfile(prof);
      setIsBackendHealthy(true);
    } else {
      setIsBackendHealthy(false);
      // Fallback default profile so frontend renders perfectly even before backend starts
      setProfile({
        fullName: 'Alex Morgan',
        email: 'alex.morgan@example.com',
        targetRole: 'Full Stack Java & React Engineer',
        yearsOfExperience: 3,
        skills: 'Java, Spring Boot, React, JavaScript, SQL, Git, REST API, Docker',
        bio: 'Passionate full stack software engineer specializing in scalable Spring Boot services and reactive web UIs.',
        atsScore: 74,
        readinessScore: 78
      });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <Navbar profile={profile} isBackendHealthy={isBackendHealthy} />

      <div className="flex-1 max-w-7xl w-full mx-auto flex flex-col md:flex-row">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0">
          {activeTab === 'dashboard' && (
            <Dashboard profile={profile} setActiveTab={setActiveTab} />
          )}

          {activeTab === 'resume' && (
            <ResumeOptimizer profile={profile} />
          )}

          {activeTab === 'roadmap' && (
            <CareerRoadmap profile={profile} />
          )}

          {activeTab === 'interview' && (
            <MockInterview profile={profile} />
          )}

          {activeTab === 'jobs' && (
            <JobBoard profile={profile} />
          )}
        </main>
      </div>

      <footer className="border-t border-slate-900 bg-slate-950/90 py-4 text-center text-xs text-slate-500">
        CareerPilotAI © 2026 — Full Stack Spring Boot 4 & React 19 Architecture
      </footer>
    </div>
  );
}
