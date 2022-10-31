const normalizeError = (error: unknown, message: string): Error =>
  error instanceof Error ? error : new Error(message);

export default normalizeError;
