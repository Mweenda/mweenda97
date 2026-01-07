import { useState } from 'react';
import { Button } from '@mweenda97/ui';
import { Mail, MessageCircle, Github, ArrowRight, CheckCircle } from 'lucide-react';

const CONTACT_EMAIL = 'mweenda97@gmail.com';
const WHATSAPP_URL = `https://wa.me/260768829959?text=Hi%20Mweenda%2C%20I%20would%20like%20to%20discuss%20a%20project.`;

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
}

const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with payment integration, inventory management, and real-time order tracking.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com',
  },
  {
    id: '2',
    title: 'Task Management Application',
    description: 'Collaborative task management tool with real-time updates, team collaboration features, and analytics dashboard.',
    technologies: ['React', 'Firebase', 'Tailwind CSS', 'WebSockets'],
    github: 'https://github.com',
  },
  {
    id: '3',
    title: 'AI-Powered Chatbot',
    description: 'Intelligent chatbot using NLP with context awareness, multi-language support, and integration capabilities.',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'React'],
    github: 'https://github.com',
  },
  {
    id: '4',
    title: 'Portfolio Website',
    description: 'Professional portfolio showcasing full-stack capabilities with type-safe architecture and user isolation.',
    technologies: ['TypeScript', 'React', 'Vite', 'Tailwind CSS', 'tRPC'],
    github: 'https://github.com/Mweenda/mweenda97',
  },
];

export default function App(): JSX.Element {
  const [activeSection, setActiveSection] = useState<'home' | 'about' | 'projects' | 'contact'>('home');
  const [messageForm, setMessageForm] = useState({ name: '', email: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleMessageSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setSubmitStatus('loading');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus('success');
      setMessageForm({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus('idle'), 3000);
    } catch (_error) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      <nav className="sticky top-0 z-50 border-b border-slate-700 bg-slate-950/95 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Mweenda Lubi</h1>
          <div className="flex gap-2 flex-wrap">
            <Button variant={activeSection === 'home' ? 'default' : 'ghost'} onClick={() => setActiveSection('home')} className="text-sm">Home</Button>
            <Button variant={activeSection === 'about' ? 'default' : 'ghost'} onClick={() => setActiveSection('about')} className="text-sm">About</Button>
            <Button variant={activeSection === 'projects' ? 'default' : 'ghost'} onClick={() => setActiveSection('projects')} className="text-sm">Projects</Button>
            <Button variant={activeSection === 'contact' ? 'default' : 'ghost'} onClick={() => setActiveSection('contact')} className="text-sm">Contact</Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl text-center space-y-10">
            <div className="space-y-4">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Mweenda Lubi</h1>
              <p className="text-2xl text-slate-300">Self-Motivated Full-Stack Developer & Freelancer</p>
              <p className="text-slate-400 max-w-3xl mx-auto text-lg leading-relaxed">I&apos;m a passionate developer specializing in building scalable web applications, AI-driven solutions, and secure infrastructure. Available for freelance projects, internships, and full-time opportunities.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-10">
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-blue-500/50 transition-colors">
                <h3 className="font-semibold text-lg mb-2 text-blue-400">For Individuals</h3>
                <p className="text-slate-400 text-sm">Looking for a dedicated freelancer? I deliver high-quality solutions with attention to detail and timely delivery.</p>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-purple-500/50 transition-colors">
                <h3 className="font-semibold text-lg mb-2 text-purple-400">For Companies</h3>
                <p className="text-slate-400 text-sm">Seeking a motivated team member? I bring strong technical skills, work ethic, and passion for solving complex problems.</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center pt-8">
              <Button size="lg" onClick={() => setActiveSection('projects')} className="gap-2">View Projects <ArrowRight className="w-4 h-4" /></Button>
              <Button variant="outline" size="lg" onClick={() => setActiveSection('contact')}><Mail className="w-4 h-4 mr-2" /> Get In Touch</Button>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'about' && (
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-20">
          <div className="max-w-4xl space-y-12 w-full">
            <h2 className="text-5xl font-bold">About Me</h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold text-blue-400 mb-3">Who I Am</h3>
                <p className="text-slate-300 leading-relaxed">I&apos;m Mweenda Lubi, a self-motivated full-stack developer passionate about creating elegant solutions to complex problems. With a strong foundation in computer science and hands-on experience in modern web technologies, I&apos;m dedicated to continuous learning and delivering exceptional results.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-purple-400 mb-3">What I Do</h3>
                <p className="text-slate-300 leading-relaxed">I specialize in building full-stack web applications, from intuitive user interfaces to robust backend systems. My expertise includes React, Node.js, TypeScript, Firebase, and modern DevOps practices. I&apos;m also passionate about AI integration and creating solutions that scale.</p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-pink-400 mb-3">What I&apos;m Passionate About</h3>
                <ul className="space-y-2 text-slate-300">
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /><span>Building user-centric applications that solve real problems</span></li>
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /><span>Writing clean, maintainable, type-safe code</span></li>
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /><span>Exploring AI and machine learning applications</span></li>
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /><span>Mentoring junior developers and sharing knowledge</span></li>
                  <li className="flex gap-3"><CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" /><span>Contributing to open-source projects</span></li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-indigo-400 mb-3">What I Offer</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {['Full-Stack Development', 'API Design & Implementation', 'Database Architecture', 'UI/UX Development', 'Code Reviews & Optimization', 'Technical Consulting'].map((skill, idx) => (
                    <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded p-4"><p className="text-slate-300">{skill}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'projects' && (
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl w-full space-y-12">
            <h2 className="text-5xl font-bold">School Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {PROJECTS.map((project) => (
                <div key={project.id} className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors hover:shadow-lg">
                  <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                  <p className="text-slate-400 mb-4">{project.description}</p>
                  <div className="mb-4">
                    <p className="text-sm text-slate-500 mb-2">Technologies:</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (<span key={idx} className="bg-slate-700/50 border border-slate-600 rounded-full px-3 py-1 text-xs text-slate-300">{tech}</span>))}
                    </div>
                  </div>
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"><Github className="w-4 h-4" /> View on GitHub</a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contact' && (
        <section className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-20">
          <div className="max-w-3xl w-full space-y-12">
            <h2 className="text-5xl font-bold">Get In Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold">Contact Information</h3>
                <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-blue-500/50 transition-colors">
                  <Mail className="w-6 h-6 text-blue-400" />
                  <div><p className="text-sm text-slate-500">Email</p><p className="text-white">{CONTACT_EMAIL}</p></div>
                </a>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-slate-800/50 border border-slate-700 rounded-lg hover:border-green-500/50 transition-colors">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                  <div><p className="text-sm text-slate-500">WhatsApp</p><p className="text-white">+260 768 829 959</p></div>
                </a>
                <div className="space-y-3 pt-4">
                  <p className="text-sm text-slate-500">Quick Links</p>
                  <a href="https://github.com/Mweenda" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-blue-400 transition-colors"><Github className="w-4 h-4" /> GitHub Profile</a>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-semibold">Send me a Message</h3>
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Name</label>
                    <input type="text" value={messageForm.name} onChange={(e) => setMessageForm({ ...messageForm, name: e.target.value })} required className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Email</label>
                    <input type="email" value={messageForm.email} onChange={(e) => setMessageForm({ ...messageForm, email: e.target.value })} required className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm text-slate-400 mb-2">Message</label>
                    <textarea value={messageForm.message} onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })} required rows={4} className="w-full bg-slate-800 border border-slate-700 rounded px-4 py-2 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none" placeholder="Your message..." />
                  </div>
                  <Button type="submit" disabled={submitStatus === 'loading'} className="w-full">
                    {submitStatus === 'loading' && 'Sending...'}
                    {submitStatus === 'success' && 'Message Sent!'}
                    {submitStatus === 'error' && 'Failed to Send'}
                    {submitStatus === 'idle' && 'Send Message'}
                  </Button>
                  {submitStatus === 'success' && (<div className="p-3 bg-green-900/20 border border-green-700/50 rounded text-green-400 text-sm">Thank you! I&apos;ll get back to you soon.</div>)}
                </form>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-slate-700 rounded-lg p-8 text-center">
              <h3 className="text-2xl font-semibold mb-2">Ready to collaborate?</h3>
              <p className="text-slate-400 mb-4">Whether you have a project in mind or just want to chat, I&apos;m always open to new opportunities.</p>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="gap-2"><MessageCircle className="w-4 h-4" /> Message on WhatsApp</Button>
              </a>
            </div>
          </div>
        </section>
      )}

      <footer className="border-t border-slate-700 bg-slate-950/50 py-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
          <p>© 2026 Mweenda Lubi. Built with React, TypeScript, and Tailwind CSS.</p>
        </div>
      </footer>
    </div>
  );
}
