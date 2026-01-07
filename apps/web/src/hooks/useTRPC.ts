import { useCallback } from 'react';

/**
 * Simple tRPC client for calling backend procedures
 * Note: This is a simplified client-side implementation for demo purposes
 * In production, use @trpc/client for full type safety
 */

interface TRPCOptions {
  baseUrl?: string;
}

const defaultOptions: TRPCOptions = {
  baseUrl: process.env.REACT_APP_TRPC_URL || 'http://localhost:5000/trpc',
};

/**
 * Call a tRPC procedure
 * @param procedure - Dot-notation procedure path (e.g., "terminal.initSession")
 * @param input - Input data for the procedure
 * @param options - Configuration options
 */
async function callTRPC<T>(
  procedure: string,
  input: unknown,
  options: TRPCOptions = defaultOptions
): Promise<T> {
  const url = new URL(`${options.baseUrl}/${procedure}`);

  const response = await fetch(url.toString(), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ input }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'tRPC call failed');
  }

  const { result } = await response.json();
  return result.data as T;
}

/**
 * Hook for terminal operations
 */
export function useTerminal() {
  const initSession = useCallback(
    async (ipHash?: string) => {
      return callTRPC<{
        success: boolean;
        sessionId: string;
        message: string;
        prompt: string;
      }>('terminal.initSession', { ipHash });
    },
    []
  );

  const executeCommand = useCallback(async (sessionId: string, command: string, type: string) => {
    return callTRPC<{
      output: string;
      prompt: string;
      sessionValid: boolean;
    }>('terminal.executeCommand', { sessionId, command, type });
  }, []);

  const getSession = useCallback(async (sessionId: string) => {
    return callTRPC<{
      currentMode: string;
      prompt: string;
      commandHistory: string[];
      isValid: boolean;
    }>('terminal.getSession', { sessionId });
  }, []);

  const resetSession = useCallback(async (sessionId: string) => {
    return callTRPC<{
      success: boolean;
      message: string;
      prompt: string;
    }>('terminal.resetSession', { sessionId });
  }, []);

  return { initSession, executeCommand, getSession, resetSession };
}

/**
 * Hook for lead capture operations
 */
export function useLeadCapture() {
  const capture = useCallback(async (email: string, name: string, source?: string) => {
    return callTRPC<{
      success: boolean;
      leadId: string;
      message: string;
      downloadUrl: string;
    }>('leads.capture', { email, name, source });
  }, []);

  const verify = useCallback(async (email: string) => {
    return callTRPC<{
      exists: boolean;
    }>('leads.verify', { email });
  }, []);

  return { capture, verify };
}

/**
 * Hook for project operations
 */
export function useProjects() {
  const list = useCallback(async (featured?: boolean, category?: string) => {
    return callTRPC<any[]>('projects.list', { featured, category });
  }, []);

  const getById = useCallback(async (id: string) => {
    return callTRPC<any>('projects.getById', { id });
  }, []);

  return { list, getById };
}

/**
 * Hook for blog operations
 */
export function useBlog() {
  const listPublished = useCallback(async (limit = 10, offset = 0) => {
    return callTRPC<any[]>('blog.listPublished', { limit, offset });
  }, []);

  const getBySlug = useCallback(async (slug: string) => {
    return callTRPC<any>('blog.getBySlug', { slug });
  }, []);

  return { listPublished, getBySlug };
}
