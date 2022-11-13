export interface ResultHandler<T = never> {
  onSuccess?: (...data: T extends never ? [never] : [T]) => void;
  onError?: (err: Error) => void;
}
