"use client";
import { useState } from "react";

export default function PodcastNotesPage() {
  const [episodeTitle, setEpisodeTitle] = useState("");
  const [guest, setGuest] = useState("");
  const [topics, setTopics] = useState("");
  const [duration, setDuration] = useState("45 minutes");
  const [style, setStyle] = useState("Conversational");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!episodeTitle.trim()) return;
    setLoading(true);
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ episodeTitle, guest, topics, duration, style }),
    });
    const data = await res.json();
    setOutput(data.result || data.error);
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-950 via-slate-950 to-black text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-yellow-300 mb-2">AI Podcast Notes</h1>
        <p className="text-slate-400 mb-8">Generate show notes, timestamps, and social clips for your podcast</p>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-900/60 border border-yellow-500/20 rounded-2xl p-6 space-y-4">
            <div>
              <label className="block text-sm text-slate-300 mb-1">Episode Title *</label>
              <input value={episodeTitle} onChange={e => setEpisodeTitle(e.target.value)} placeholder="Episode title"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Guest</label>
              <input value={guest} onChange={e => setGuest(e.target.value)} placeholder="Guest name and brief bio"
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-1">Topics Covered</label>
              <textarea value={topics} onChange={e => setTopics(e.target.value)} rows={3}
                placeholder="Main topics discussed in this episode..."
                className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500 resize-none" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-1">Duration</label>
                <select value={duration} onChange={e => setDuration(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500">
                  {["20 min","30 min","45 min","60 min","90 min"].map(d => <option key={d}>{d}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-1">Style</label>
                <select value={style} onChange={e => setStyle(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-yellow-500">
                  {["Conversational","Interview","Solo","Panel"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <button onClick={handleGenerate} disabled={loading}
              className="w-full bg-yellow-600 hover:bg-yellow-500 disabled:bg-yellow-800 text-black font-semibold py-3 rounded-xl transition-colors">
              {loading ? "Generating notes..." : "Generate Podcast Notes"}
            </button>
          </div>
          <div className="bg-slate-900/60 border border-yellow-500/20 rounded-2xl p-6">
            <h2 className="text-lg font-semibold text-yellow-300 mb-4">Show Notes</h2>
            {output ? (
              <pre className="text-slate-200 text-sm whitespace-pre-wrap font-sans leading-relaxed max-h-[600px] overflow-y-auto">{output}</pre>
            ) : (
              <div className="text-slate-500 flex items-center justify-center h-64">Notes will appear here...</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
