export type MutableRefObject<T> = {
  current: T | null;
};

export type ValidationError = {
  message: string;
  errors: Record<string, string[]>;
}
