
export const split = delimeter => function*(text) {
  let start = 0;

  for (let i = 0; i < text.length; i++) {
    const curr = text.slice(i, i + delimeter.length);

    if (curr !== delimeter) continue;
    
    yield text.slice(start, i);
    start = i + 1;
  }

  yield text.slice(start);
}

export const map = func => function*(iter) {
  for (const item of iter) yield func(item);
}

export const filter = func => function*(iter) {
  for (const [index, item] of enumerate(iter)) {
    const shouldContinue = func(item, index);
    if (!shouldContinue) continue;

    yield item;
  }
}

export function* enumerate(iter) {
  let index = 0;
  for (const item of iter) {
    yield [index, item];
    index++;
  }
}

export const takeWhile = func => function*(iter) {
  for (const [index, item] of enumerate(iter)) {
    const shouldContinue = func(item, index);
    if (!shouldContinue) break;

    yield item;
  }
}

export const take = num => function*(iter) {
  for (const [index, item] of enumerate(iter)) {
    if (index === num) break;

    yield item;
  }
}

export function* loop(iter) {
  while (true) {
    yield* iter;
  }
}

export function* pass(iter) {
  yield* iter;
}

// util funcs
export const pipe = (...funcs) => val => funcs.reduce((accum, curr) => curr(accum), val);

export const collect = iter => [...iter];