import React, { useEffect, useRef, useState } from 'react';
import Spline from '@splinetool/react-spline';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

function GlassCard({ children, className = '' }) {
  return (
    <div className={`backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl shadow-2xl ${className}`}>
      {children}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none" />
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-xs text-cyan-300/90 ring-1 ring-white/10">
          <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_2px_rgba(34,211,238,0.8)]" />
          Live • Futuristic API Explorer
        </div>
        <h1 className="mt-6 text-5xl md:text-6xl font-semibold tracking-tight text-white">There Is an API for That.</h1>
        <p className="mt-4 text-lg md:text-xl text-white/70">
          Discover the perfect API for anything you want to build—instantly. Powered by AI, automation, and community insights.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#finder" className="rounded-xl px-5 py-3 bg-cyan-500/90 hover:bg-cyan-400 text-black font-semibold transition">Find APIs</a>
          <a href="#studio" className="rounded-xl px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold transition">Open Dashboard</a>
        </div>
      </div>
    </section>
  );
}

function Finder() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [open, setOpen] = useState(true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/use-cases`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: query })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="finder" className="relative py-20">
      <div className="absolute inset-0 -z-0">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.25),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(168,85,247,0.18),transparent_60%)]" />
      </div>
      <div className="relative z-10 mx-auto max-w-4xl px-6">
        <GlassCard className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-white">What are you trying to build?</h2>
          <p className="mt-1 text-white/60">Be as specific as possible—our AI will analyze your requirements.</p>
          <form onSubmit={onSubmit} className="mt-6 flex flex-col gap-3 md:flex-row">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Subscription SaaS with user auth, billing, emails, and analytics"
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <button
              disabled={loading || !query}
              className="rounded-xl bg-cyan-500/90 hover:bg-cyan-400 disabled:opacity-50 text-black font-semibold px-5 py-3"
            >
              {loading ? 'Analyzing…' : 'Find APIs for Me'}
            </button>
          </form>
          {result && (
            <div className="mt-6">
              <button onClick={() => setOpen(!open)} className="text-sm text-white/60 hover:text-white transition">{open ? 'Hide' : 'Show'} AI Output</button>
              {open && (
                <GlassCard className="mt-3 p-4">
                  <ul className="text-white/90 text-sm leading-7">
                    <li><span className="text-white/60">Summary:</span> {result.summary}</li>
                    <li><span className="text-white/60">Primary APIs:</span> {result.primary_apis?.join(', ')}</li>
                    <li><span className="text-white/60">Supporting APIs:</span> {result.supporting_apis?.join(', ')}</li>
                    <li><span className="text-white/60">Next Step:</span> {result.next_step}</li>
                    {result.question && <li><span className="text-white/60">Question:</span> {result.question}</li>}
                  </ul>
                </GlassCard>
              )}
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}

function Studio() {
  return (
    <section id="studio" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h3 className="text-3xl font-semibold text-white">API Builder Studio</h3>
        <p className="mt-2 text-white/60 max-w-2xl">Visually combine APIs, preview example requests, and export to n8n. (Interactive canvas coming next.)</p>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <GlassCard className="p-5">
            <h4 className="text-white font-medium">Search APIs</h4>
            <p className="text-white/60 text-sm mt-1">Quickly find APIs with filters for auth, rate limits, and pricing.</p>
          </GlassCard>
          <GlassCard className="p-5">
            <h4 className="text-white font-medium">Combine Visually</h4>
            <p className="text-white/60 text-sm mt-1">Drag, connect, and test flows with real-time examples.</p>
          </GlassCard>
          <GlassCard className="p-5">
            <h4 className="text-white font-medium">Export & Save</h4>
            <p className="text-white/60 text-sm mt-1">Export to n8n, copy code, and save flows to your dashboard.</p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="min-h-screen w-full bg-[#0a0b0f] text-white">
      <Hero />
      <Finder />
      <Studio />
      <footer className="py-10 text-center text-white/50">© {new Date().getFullYear()} There Is an API for That</footer>
    </div>
  );
}
