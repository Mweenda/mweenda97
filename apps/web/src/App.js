import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Terminal, LeadCapture } from '@mweenda97/ui';
export default function App() {
    const [activeTab, setActiveTab] = useState('hero');
    const [sessionId, setSessionId] = useState('');
    const initTerminal = async () => {
        // TODO: Call tRPC mutation: terminal.initSession
        // const response = await trpc.terminal.initSession.mutate({ ipHash: '...' });
        // setSessionId(response.sessionId);
        // Simulate for now
        setSessionId('term_' + Date.now());
        setActiveTab('terminal');
    };
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900", children: [_jsx("nav", { className: "border-b border-slate-700 bg-slate-950/50 backdrop-blur-sm", children: _jsxs("div", { className: "max-w-7xl mx-auto px-4 py-4 flex items-center justify-between", children: [_jsx("h1", { className: "text-2xl font-bold text-white", children: "mweenda97" }), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { variant: activeTab === 'hero' ? 'default' : 'ghost', onClick: () => setActiveTab('hero'), className: "text-sm", children: "Portfolio" }), _jsx(Button, { variant: activeTab === 'terminal' ? 'default' : 'ghost', onClick: () => setActiveTab('terminal'), className: "text-sm", children: "Terminal" }), _jsx(Button, { variant: activeTab === 'lead' ? 'default' : 'ghost', onClick: () => setActiveTab('lead'), className: "text-sm", children: "Resources" })] })] }) }), activeTab === 'hero' && (_jsxs("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4", children: [_jsxs("div", { className: "max-w-3xl text-center space-y-8", children: [_jsx("h2", { className: "text-6xl font-bold text-white", children: "Christopher Kawanga" }), _jsx("p", { className: "text-xl text-slate-300", children: "AI | Full-Stack Development | Network Security (CCNA)" }), _jsx("p", { className: "text-slate-400 max-w-2xl mx-auto", children: "Bridging the gap between secure network infrastructure and AI-driven software solutions. This portfolio demonstrates production-grade engineering with type-safe architecture, user isolation principles, and lead generation optimization." }), _jsxs("div", { className: "flex gap-4 justify-center pt-8", children: [_jsx(Button, { variant: "default", size: "lg", onClick: () => setActiveTab('lead'), children: "Download Technical CV" }), _jsx(Button, { variant: "outline", size: "lg", onClick: initTerminal, children: "Explore Terminal" })] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-4xl", children: [
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
                        ].map((feature, idx) => (_jsxs("div", { className: "bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors", children: [_jsx("h3", { className: "font-semibold text-white mb-2", children: feature.title }), _jsx("p", { className: "text-sm text-slate-400", children: feature.description })] }, idx))) })] })), activeTab === 'terminal' && (_jsx("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12", children: _jsxs("div", { className: "max-w-2xl w-full space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: "Terminal Sandbox" }), _jsx("p", { className: "text-slate-400", children: "Interactive CCNA command simulator. Each session is isolated to ensure user privacy." })] }), sessionId && (_jsx(Terminal, { sessionId: sessionId, className: "w-full" })), _jsxs("div", { className: "flex gap-4", children: [_jsx(Button, { variant: "default", onClick: initTerminal, disabled: !!sessionId, children: sessionId ? 'Session Active' : 'Start Session' }), sessionId && (_jsx(Button, { variant: "outline", onClick: () => setSessionId(''), children: "End Session" }))] })] }) })), activeTab === 'lead' && (_jsx("div", { className: "flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-12", children: _jsxs("div", { className: "max-w-2xl w-full space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: "Download Resources" }), _jsx("p", { className: "text-slate-400", children: "Access technical guides and Christopher's resume. Your data is secure and encrypted." })] }), _jsx(LeadCapture, { magnetType: "technical-cv-download", source: "hero-cta", onSuccess: (leadId) => {
                                console.log('Lead captured:', leadId);
                            }, onError: (error) => {
                                console.error('Lead capture error:', error);
                            } })] }) }))] }));
}
