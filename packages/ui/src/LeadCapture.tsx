import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from './utils/cn';

export interface LeadCaptureProps {
  magnetType: 'network-security-audit-checklist' | 'gemini-api-integration-guide' | 'technical-cv-download';
  source?: 'hero-cta' | 'project-card' | 'ai-lab' | 'terminal-sandbox';
  onSuccess?: (leadId: string) => void;
  onError?: (error: string) => void;
  className?: string;
}

interface FormState {
  email: string;
  name: string;
  company: string;
  jobTitle: string;
  linkedInUrl: string;
  message: string;
}

interface SubmitState {
  status: 'idle' | 'submitting' | 'success' | 'error';
  message: string;
  downloadUrl?: string;
}

const initialFormState: FormState = {
  email: '',
  name: '',
  company: '',
  jobTitle: '',
  linkedInUrl: '',
  message: '',
};

export const LeadCapture = React.forwardRef<HTMLDivElement, LeadCaptureProps>(
  ({ magnetType: _magnetType, source: _source = 'hero-cta', onSuccess, onError, className }, ref) => {
    const [form, setForm] = useState<FormState>(initialFormState);
    const [submitState, setSubmitState] = useState<SubmitState>({
      status: 'idle',
      message: '',
    });

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ): void => {
      const { name, value } = e.target;
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
      e.preventDefault();
      setSubmitState({ status: 'submitting', message: '' });

      try {
        // TODO: Call tRPC mutation: leads.capture
        // const result = await trpc.leads.capture.mutate({
        //   ...form,
        //   magnetType,
        //   source,
        // });

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSubmitState({
          status: 'success',
          message: 'Check your email for the download link!',
          downloadUrl: 'https://storage.googleapis.com/mweenda97/technical-cv.pdf',
        });

        setForm(initialFormState);
        if (onSuccess) onSuccess('lead_' + Date.now());
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to submit lead';
        setSubmitState({
          status: 'error',
          message: errorMessage,
        });
        if (onError) onError(errorMessage);
      }
    };

    const labelClasses =
      'block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2';
    const inputClasses = cn(
      'w-full px-4 py-2 rounded-md border border-slate-300 dark:border-slate-600',
      'bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100',
      'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
      'disabled:opacity-50 disabled:cursor-not-allowed'
    );

    return (
      <div ref={ref} className={cn('w-full max-w-md', className)}>
        <AnimatePresence mode="wait">
          {submitState.status === 'idle' || submitState.status === 'submitting' ? (
            <motion.form
              key="form"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleSubmit}
              className="space-y-4"
            >
              <div>
                <label htmlFor="email" className={labelClasses}>
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleInputChange}
                  disabled={submitState.status === 'submitting'}
                  className={inputClasses}
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="name" className={labelClasses}>
                  Full Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleInputChange}
                  disabled={submitState.status === 'submitting'}
                  className={inputClasses}
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="company" className={labelClasses}>
                  Company
                </label>
                <input
                  id="company"
                  name="company"
                  type="text"
                  value={form.company}
                  onChange={handleInputChange}
                  disabled={submitState.status === 'submitting'}
                  className={inputClasses}
                  placeholder="Tech Company Inc."
                />
              </div>

              <div>
                <label htmlFor="jobTitle" className={labelClasses}>
                  Job Title
                </label>
                <input
                  id="jobTitle"
                  name="jobTitle"
                  type="text"
                  value={form.jobTitle}
                  onChange={handleInputChange}
                  disabled={submitState.status === 'submitting'}
                  className={inputClasses}
                  placeholder="Senior Engineer"
                />
              </div>

              <div>
                <label htmlFor="linkedInUrl" className={labelClasses}>
                  LinkedIn Profile
                </label>
                <input
                  id="linkedInUrl"
                  name="linkedInUrl"
                  type="url"
                  value={form.linkedInUrl}
                  onChange={handleInputChange}
                  disabled={submitState.status === 'submitting'}
                  className={inputClasses}
                  placeholder="https://linkedin.com/in/..."
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClasses}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={3}
                  value={form.message}
                  onChange={handleInputChange}
                  disabled={submitState.status === 'submitting'}
                  className={cn(inputClasses, 'resize-none')}
                  placeholder="Tell us what you're interested in..."
                />
              </div>

              <button
                type="submit"
                disabled={submitState.status === 'submitting'}
                className={cn(
                  'w-full px-4 py-2 rounded-md font-semibold text-white',
                  'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400',
                  'transition-colors duration-200',
                  'flex items-center justify-center gap-2'
                )}
              >
                {submitState.status === 'submitting' ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ⟳
                    </motion.div>
                    Submitting...
                  </>
                ) : (
                  'Download Resource'
                )}
              </button>
            </motion.form>
          ) : submitState.status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-3">✓</div>
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-2">
                Success!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300 mb-4">
                {submitState.message}
              </p>
              {submitState.downloadUrl && (
                <a
                  href={submitState.downloadUrl}
                  className="inline-block px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-semibold transition-colors"
                >
                  Download Now
                </a>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="error"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center"
            >
              <div className="text-4xl mb-3">✕</div>
              <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-2">
                Error
              </h3>
              <p className="text-sm text-red-700 dark:text-red-300 mb-4">
                {submitState.message}
              </p>
              <button
                onClick={() =>
                  setSubmitState({
                    status: 'idle',
                    message: '',
                  })
                }
                className="inline-block px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-semibold transition-colors"
              >
                Try Again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

LeadCapture.displayName = 'LeadCapture';
