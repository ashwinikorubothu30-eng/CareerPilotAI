import React from 'react';

export const IconCompass = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconFileText = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="14 2 14 8 20 8"/>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="13" x2="8" y2="13"/>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="17" x2="8" y2="17"/>
    <polyline strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="10 9 9 9 8 9"/>
  </svg>
);

export const IconMap = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="8" y1="2" x2="8" y2="18"/>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="16" y1="6" x2="16" y2="22"/>
  </svg>
);

export const IconMic = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 10v2a7 7 0 0 1-14 0v-2"/>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="12" y1="19" x2="12" y2="23"/>
    <line strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x1="8" y1="23" x2="16" y2="23"/>
  </svg>
);

export const IconBriefcase = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <rect strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" x="2" y="7" width="20" height="14" rx="2" ry="2"/>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
  </svg>
);

export const IconSparkles = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M5 3v4"/>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M19 17v4"/>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M3 5h4"/>
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M17 19h4"/>
  </svg>
);

export const IconCheckCircle = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" points="22 4 12 14.01 9 11.01"/>
  </svg>
);

export const IconAlertCircle = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
    <line x1="12" y1="8" x2="12" y2="12" strokeWidth="2" strokeLinecap="round"/>
    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const IconArrowRight = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <line x1="5" y1="12" x2="19" y2="12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="12 5 19 12 12 19" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconRefresh = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="23 4 23 10 17 10" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <polyline points="1 20 1 14 7 14" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconZap = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconChevronRight = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="9 18 15 12 9 6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const IconChevronDown = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <polyline points="6 9 12 15 18 9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

