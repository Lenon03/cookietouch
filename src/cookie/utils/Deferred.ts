export interface IDeferred<T> {
  resolve: (x: T | Promise<T>) => void;
  reject: (x: T | Promise<T>) => void;
  promise: Promise<T>;
}

export function Deferred<T>(): IDeferred<T> {
  const deferred: IDeferred<T> = {
    promise: null as any,
    reject: null as any,
    resolve: null as any,
  };

  deferred.promise = new Promise<T>((resolve: any, reject: any) => {
    deferred.resolve = resolve;
    deferred.reject = reject;
  });

  return deferred as IDeferred<T>;
}
