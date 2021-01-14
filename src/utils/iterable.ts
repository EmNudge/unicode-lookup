
export const split = (delimeter: string) => function*(text: string) {
  let start = 0;

  for (let i = 0; i < text.length; i++) {
    const curr = text.slice(i, i + delimeter.length);

    if (curr !== delimeter) continue;
    
    yield text.slice(start, i);
    start = i + 1;
  }

  yield text.slice(start);
}


export const map = <T, U>(func: (input: T) => U) => function*(iter: Iterable<T>): Iterable<U> {
  for (const item of iter) yield func(item);
}

type filterFunc<T> = (input: T, index: number) => boolean;
export const filter = <T, U>(func: filterFunc<T>) => function*(iter: Iterable<T>): Iterable<T> {
  for (const [index, item] of enumerate(iter)) {
    const shouldContinue = func(item, index);
    if (!shouldContinue) continue;

    yield item;
  }
}

export function* enumerate<T>(iter: Iterable<T>): Iterable<[number, T]> {
  let index = 0;
  for (const item of iter) {
    yield [index, item];
    index++;
  }
}

export const takeWhile = <T>(func: filterFunc<T>) => function*(iter: Iterable<T>): Iterable<T> {
  for (const [index, item] of enumerate(iter)) {
    const shouldContinue = func(item, index);
    if (!shouldContinue) break;

    yield item;
  }
}

export const take = <T>(num: number) => function*(iter: Iterable<T>): Iterable<T> {
  for (const [index, item] of enumerate(iter)) {
    if (index === num) break;

    yield item;
  }
}

export function* loop<T>(iter: Iterable<T>) {
  while (true) {
    yield* iter;
  }
}

export function* join<T>(...iters: Iterable<T>[]) {
  for (const iter of iters) {
    yield* iter;
  }
}

export const append = <T>(iter: Iterable<T>) => function*(mainIter: Iterable<T>) {
  yield* mainIter;
  yield* iter;
}

type voidFunc<T> = (input: T, index: number) => void;
export const forEach = <T>(func: voidFunc<T>) => function*(iter: Iterable<T>): Iterable<T> {
  for (const [index, item] of enumerate(iter)) {
    func(item, index);
    yield item;
  }
}

// util funcs
type iterFunc = (input: Iterable<any>) => Iterable<any>;
export const pipe = (...funcs: iterFunc[]) => (val: any) => funcs.reduce((accum, curr) => curr(accum), val);

export const collect = <T>(iter: Iterable<T>): T[] => [...iter];