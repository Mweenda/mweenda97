import { useState } from 'react';
import { Button, Terminal, LeadCapture } from '@mweenda97/ui';

export default function App(): JSX.Element {
  const [activeTab, setActiveTab] = useState<'hero' | 'terminal' | 'lead'>('hero');
  const [sessionId, setSessionId] = useState<string>('');

  const initTerminal = async (): Promise<void> => {
    // TODO: Call tRPC mutation: terminal.initSession
    // const response = await trpc.terminal.initSession.mutate({ ipHash: '...' });
    // setSessionId(response.sessionId);

    // Simulate for now
    setSessionId('term_' + Date.now());
    setActiveTab('terminal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation */}
      <nav className="border-b border-slate-700 bg-slate-950/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">mweenda97</h1>
          <div className="flex gap-4">
            <Button
              variant={activeTab === 'hero' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('hero')}
              className="text-sm"
            >
              Portfolio
            </Button>
            <Button
              variant={activeTab === 'terminal' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('terminal')}
              className="text-sm"
            >
              Terminal
            </Button>
            <Button
              variant={activeTab === 'lead' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('lead')}
              className="text-sm"
            >
              Resources
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      {activeTab === 'hero' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4">
          <div className="max-w-3xl text-center space-y-8">
            <h2 className="text-6xl font-bold text-white">
              Christopher Kawanga
            </h2>
            <p className="text-xl text-slate-300">
              AI | Full-Stack Development | Network Security (CCNA)
            </p>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Bridging the gap between secure network infrastructure and AI-driven software solutions.
              This portfolio demonstrates production-grade engineering with type-safe architecture,
              user isolation principles, and lead generation optimization.
            </p>

            <div className="flex gap-4 justify-center pt-8">
              <Button variant="default" size="lg" onClick={() => setActiveTab('lead')}>
                Download Technical CV
              </Button>
              <Button variant="outline" size="lg" onClick={initTerminal}>
                Explore Terminal
              </Button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl">
            {[
              {
                title: 'Type-Safe API',
                description: 'tRPC + Zod for end-to-end type safety',
              },
              {
                title: 'User Isolation',
                description: 'Session management with per-user sandboxing',
              },
              {
                title: 'Data Integrity',
                description: 'Firestore transactions + confidentiality',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
              >
                <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Terminal Sandbox */}
      {activeTab === 'terminal' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
          <div className="max-w-2xl w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Terminal Sandbox</h2>
              <p className="text-slate-400">
                Interactive CCNA command simulator. Each session is isolated to ensure user privacy.
              </p>
            </div>

            {sessionId && (
              <Terminal
                sessionId={sessionId}
                className="w-full"
              />
            )}

            <div className="flex gap-4">
              <Button variant="default" onClick={initTerminal} disabled={!!sessionId}>
                {sessionId ? 'Session Active' : 'Start Session'}
              </Button>
              {sessionId && (
                <Button variant="outline" onClick={() => setSessionId('')}>
                  End Session
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Lead Capture */}
      {activeTab === 'lead' && (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12">
          <div className="max-w-2xl w-full space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-white">Download Resources</h2>
              <p className="text-slate-400">
                Access technical guides and Christopher's resume. Your data is secure and encrypted.
              </p>
            </div>

            <LeadCapture
              magnetType="technical-cv-download"
              source="hero-cta"
              onSuccess={(leadId) => {
                console.log('Lead captured:', leadId);
              }}
              onError={(error) => {
                console.error('Lead capture error:', error);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
