type HandlerOptions<T> = {
    onSuccess?: (result: T) => void;
    onError?: (error: unknown) => void;
    onFinally?: () => void;
};

export async function execute<T>(
    fn: () => Promise<T>,
    handlers: HandlerOptions<T> = {}
): Promise<T | undefined> {
    try {
        const result = await fn();
        handlers.onSuccess?.(result);
        return result;
    } catch (err) {
        handlers.onError?.(err);
        return undefined;
    } finally {
        handlers.onFinally?.();
    }
}
