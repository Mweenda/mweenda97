import { useCallback } from 'react';
const defaultOptions = {
    baseUrl: process.env.REACT_APP_TRPC_URL || 'http://localhost:5000/trpc',
};
/**
 * Call a tRPC procedure
 * @param procedure - Dot-notation procedure path (e.g., "terminal.initSession")
 * @param input - Input data for the procedure
 * @param options - Configuration options
 */
async function callTRPC(procedure, input, options = defaultOptions) {
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
    return result.data;
}
/**
 * Hook for terminal operations
 */
export function useTerminal() {
    const initSession = useCallback(async (ipHash) => {
        return callTRPC('terminal.initSession', { ipHash });
    }, []);
    const executeCommand = useCallback(async (sessionId, command, type) => {
        return callTRPC('terminal.executeCommand', { sessionId, command, type });
    }, []);
    const getSession = useCallback(async (sessionId) => {
        return callTRPC('terminal.getSession', { sessionId });
    }, []);
    const resetSession = useCallback(async (sessionId) => {
        return callTRPC('terminal.resetSession', { sessionId });
    }, []);
    return { initSession, executeCommand, getSession, resetSession };
}
/**
 * Hook for lead capture operations
 */
export function useLeadCapture() {
    const capture = useCallback(async (email, name, source) => {
        return callTRPC('leads.capture', { email, name, source });
    }, []);
    const verify = useCallback(async (email) => {
        return callTRPC('leads.verify', { email });
    }, []);
    return { capture, verify };
}
/**
 * Hook for project operations
 */
export function useProjects() {
    const list = useCallback(async (featured, category) => {
        return callTRPC('projects.list', { featured, category });
    }, []);
    const getById = useCallback(async (id) => {
        return callTRPC('projects.getById', { id });
    }, []);
    return { list, getById };
}
/**
 * Hook for blog operations
 */
export function useBlog() {
    const listPublished = useCallback(async (limit = 10, offset = 0) => {
        return callTRPC('blog.listPublished', { limit, offset });
    }, []);
    const getBySlug = useCallback(async (slug) => {
        return callTRPC('blog.getBySlug', { slug });
    }, []);
    return { listPublished, getBySlug };
}
