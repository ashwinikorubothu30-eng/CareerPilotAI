const API_BASE = '/api';

export async function fetchProfile() {
  try {
    const res = await fetch(`${API_BASE}/profile`);
    if (!res.ok) throw new Error('Failed to fetch profile');
    return await res.json();
  } catch (err) {
    console.error('fetchProfile error:', err);
    return null;
  }
}

export async function saveProfile(profileData) {
  const res = await fetch(`${API_BASE}/profile`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(profileData),
  });
  if (!res.ok) throw new Error('Failed to save profile');
  return await res.json();
}

export async function analyzeResume(resumeText, targetRole = '', jobDescription = '') {
  const res = await fetch(`${API_BASE}/resume/analyze`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ resumeText, targetRole, jobDescription }),
  });
  if (!res.ok) throw new Error('Failed to analyze resume');
  return await res.json();
}

export async function improveBullet(originalBullet, targetRole = '') {
  const res = await fetch(`${API_BASE}/resume/improve-bullet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ originalBullet, targetRole }),
  });
  if (!res.ok) throw new Error('Failed to improve bullet');
  return await res.json();
}

export async function fetchRoadmapRoles() {
  try {
    const res = await fetch(`${API_BASE}/roadmap/roles`);
    if (!res.ok) throw new Error('Failed to fetch roles');
    return await res.json();
  } catch (err) {
    return [
      'Full Stack Java & React Engineer',
      'Cloud & DevOps Architect',
      'Backend & Distributed Systems Engineer',
      'AI / Machine Learning Engineer',
      'Frontend & UI/UX Specialist'
    ];
  }
}

export async function generateRoadmap(targetRole, currentLevel = 'Beginner', targetTimelineWeeks = 16) {
  const res = await fetch(`${API_BASE}/roadmap/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetRole, currentLevel, targetTimelineWeeks }),
  });
  if (!res.ok) throw new Error('Failed to generate roadmap');
  return await res.json();
}

export async function fetchInterviewQuestions(targetRole = 'Full Stack Java & React', difficulty = 'Mid', questionCount = 5) {
  const res = await fetch(`${API_BASE}/interview/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetRole, difficulty, questionCount }),
  });
  if (!res.ok) throw new Error('Failed to fetch interview questions');
  return await res.json();
}

export async function evaluateAnswer(sessionId, questionId, question, userAnswer, targetRole, difficulty = 'Mid') {
  const res = await fetch(`${API_BASE}/interview/evaluate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sessionId, questionId, question, userAnswer, targetRole, difficulty }),
  });
  if (!res.ok) throw new Error('Failed to evaluate answer');
  return await res.json();
}

export async function fetchAllJobs() {
  try {
    const res = await fetch(`${API_BASE}/jobs`);
    if (!res.ok) throw new Error('Failed to fetch jobs');
    return await res.json();
  } catch (err) {
    console.error('fetchAllJobs error:', err);
    return [];
  }
}

export async function matchJobs(userSkills = [], targetRole = '', experienceYears = 2) {
  const res = await fetch(`${API_BASE}/jobs/match`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userSkills, targetRole, experienceYears }),
  });
  if (!res.ok) throw new Error('Failed to match jobs');
  return await res.json();
}
