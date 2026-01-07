import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils/cn';

export interface TerminalProps {
  sessionId: string;
  onCommand?: (command: string) => Promise<void>;
  className?: string;
}

interface TerminalLine {
  id: string;
  type: 'prompt' | 'input' | 'output';
  content: string;
  prompt?: string;
}

export const Terminal = React.forwardRef<HTMLDivElement, TerminalProps>(
  ({ sessionId: _sessionId, onCommand, className }, ref) => {
    const [lines, setLines] = useState<TerminalLine[]>([
      {
        id: '1',
        type: 'output',
        content: 'Cisco IOS Terminal Simulator',
      },
      {
        id: '2',
        type: 'output',
        content: 'Type "help" for available commands.',
      },
    ]);
    const [input, setInput] = useState('');
    const [isExecuting, setIsExecuting] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }, [lines]);

    // Focus input on mount
    useEffect(() => {
      inputRef.current?.focus();
    }, []);

    const handleCommandSubmit = async (): Promise<void> => {
      if (!input.trim()) return;

      // Add user input to terminal
      const inputLineId = Date.now().toString();
      setLines((prev) => [
        ...prev,
        {
          id: inputLineId,
          type: 'input',
          content: input,
          prompt: 'Router>',
        },
      ]);

      setIsExecuting(true);

      try {
        // Execute command via API if provided
        if (onCommand) {
          await onCommand(input);
        }

        // Simulate command output
        const outputLineId = (Date.now() + 1).toString();
        setLines((prev) => [
          ...prev,
          {
            id: outputLineId,
            type: 'output',
            content: `[Output for: ${input}]`,
          },
        ]);
      } catch (error) {
        const errorLineId = (Date.now() + 2).toString();
        setLines((prev) => [
          ...prev,
          {
            id: errorLineId,
            type: 'output',
            content: `Error: ${error instanceof Error ? error.message : 'Unknown error'}`,
          },
        ]);
      } finally {
        setInput('');
        setIsExecuting(false);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
      if (e.key === 'Enter' && !isExecuting) {
        e.preventDefault();
        void handleCommandSubmit();
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col h-96 bg-slate-900 border border-slate-700 rounded-lg overflow-hidden font-mono text-sm text-slate-100',
          className
        )}
      >
        {/* Terminal Output */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 space-y-2 bg-gradient-to-b from-slate-900 to-slate-950"
        >
          <AnimatePresence>
            {lines.map((line) => (
              <motion.div
                key={line.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  'text-xs leading-relaxed',
                  line.type === 'prompt' && 'text-slate-400',
                  line.type === 'input' && 'text-slate-300',
                  line.type === 'output' && 'text-slate-500 italic'
                )}
              >
                {line.prompt && <span className="text-green-400">{line.prompt} </span>}
                <span>{line.content}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Terminal Input */}
        <div className="border-t border-slate-700 bg-slate-950 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-green-400 font-semibold">Router&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isExecuting}
              placeholder="enter command..."
              className={cn(
                'flex-1 bg-transparent outline-none text-slate-100 placeholder-slate-600',
                'text-xs disabled:opacity-50'
              )}
            />
            {isExecuting && (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                className="text-slate-400"
              >
                ⟳
              </motion.div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Terminal.displayName = 'Terminal';
