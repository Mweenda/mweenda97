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
    const initSession = useCallback(async (ipHash) => {
        const initTerminalSessionHandler = httpsCallable(functions, 'initTerminalSessionHandler');
        const result = await initTerminalSessionHandler({ ipHash });
        return result.data;
    }, []);
    const executeCommand = useCallback(async (sessionId, command, type) => {
        const functions2 = getFunctions();
        const executeTerminalCommandHandler = httpsCallable(functions2, 'executeTerminalCommandHandler');
        const result = await executeTerminalCommandHandler({ sessionId, command, type });
        return result.data;
    }, []);
    const getSession = useCallback(async (_sessionId) => {
        // This could be implemented as a separate function or query
        return {
            currentMode: 'user',
            prompt: 'Router>',
            commandHistory: [],
            isValid: true,
        };
    }, []);
    const resetSession = useCallback(async (_sessionId) => {
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
    const capture = useCallback(async (email, name, source) => {
        const captureLeadHandler = httpsCallable(functions2, 'captureLeadHandler');
        const result = await captureLeadHandler({ email, name, source });
        return result.data;
    }, []);
    const verify = useCallback(async (_email) => {
        return { exists: false };
    }, []);
    return { capture, verify };
}
/**
 * Hook for project operations
 */
export function useProjects() {
    const list = useCallback(async (_featured, _category) => {
        return [];
    }, []);
    const getById = useCallback(async (_id) => {
        return null;
    }, []);
    return { list, getById };
}
/**
 * Hook for blog operations
 */
export function useBlog() {
    const listPublished = useCallback(async (_limit = 10, _offset = 0) => {
        return [];
    }, []);
    const getBySlug = useCallback(async (_slug) => {
        return null;
    }, []);
    return { listPublished, getBySlug };
}
