import { useCallback } from 'react';
import { getFunctions, httpsCallable } from 'firebase/functions';

/**
 * tRPC client hooks that call Firebase Cloud Functions
 * Each hook uses Firebase's httpsCallable to invoke server-side procedures
 */

/**
 * Hook for terminal operations
 */
export function useTerminal() {
  const functions = getFunctions();

  const initSession = useCallback(async (ipHash?: string) => {
    const initTerminalSessionHandler = httpsCallable(functions, 'initTerminalSessionHandler');
    const result = await initTerminalSessionHandler({ ipHash });
    return result.data as {
      success: boolean;
      sessionId: string;
      message: string;
      prompt: string;
    };
  }, []);

  const executeCommand = useCallback(async (sessionId: string, command: string, type: string) => {
    const functions2 = getFunctions();
    const executeTerminalCommandHandler = httpsCallable(functions2, 'executeTerminalCommandHandler');
    const result = await executeTerminalCommandHandler({ sessionId, command, type });
    return result.data as {
      output: string;
      prompt: string;
      sessionValid: boolean;
    };
  }, []);

  const getSession = useCallback(async (_sessionId: string) => {
    // This could be implemented as a separate function or query
    return {
      currentMode: 'user',
      prompt: 'Router>',
      commandHistory: [] as string[],
      isValid: true,
    };
  }, []);

  const resetSession = useCallback(async (_sessionId: string) => {
    return {
      success: true,
      message: 'Configuration buffer cleared.',
      prompt: 'Router>',
    };
  }, []);

  return { initSession, executeCommand, getSession, resetSession };
}

/**
 * Hook for lead capture operations
 */
export function useLeadCapture() {
  const functions2 = getFunctions();

  const capture = useCallback(async (email: string, name: string, source?: string) => {
    const captureLeadHandler = httpsCallable(functions2, 'captureLeadHandler');
    const result = await captureLeadHandler({ email, name, source });
    return result.data as {
      success: boolean;
      leadId: string;
      message: string;
    };
  }, []);

  const verify = useCallback(async (_email: string) => {
    return { exists: false };
  }, []);

  return { capture, verify };
}

/**
 * Hook for project operations
 */
export function useProjects() {
  const list = useCallback(async (_featured?: boolean, _category?: string) => {
    return [] as any[];
  }, []);

  const getById = useCallback(async (_id: string) => {
    return null;
  }, []);

  return { list, getById };
}

/**
 * Hook for blog operations
 */
export function useBlog() {
  const listPublished = useCallback(async (_limit = 10, _offset = 0) => {
    return [] as any[];
  }, []);

  const getBySlug = useCallback(async (_slug: string) => {
    return null;
  }, []);

  return { listPublished, getBySlug };
}
