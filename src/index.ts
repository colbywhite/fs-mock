export function doWork<T>(val?: T): Promise<T | undefined> {
  return new Promise((resolve) => setTimeout(() => resolve(val), 2000));
}
