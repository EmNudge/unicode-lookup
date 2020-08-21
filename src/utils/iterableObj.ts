// this module creates a DESCRIPTION of an iterable iterface. 
// whatever recieves this object must then construct it
import { pipe } from './iterable';

export type IterDescription = { type: string, args?: any[] }
export const getIterArr = (type: string, funcArgs?: any[]): IterDescription => {
  if (!funcArgs) return { type, args: undefined };

  const args = [];
  for (const arg of funcArgs) {
    if (typeof arg !== "function") {
      args.push(arg);
      continue;
    }
    const newArg = { type: 'FUNCTION', value: `return ${arg.toString()}` };
    args.push(newArg);
  }

  return { type, args };
}

// turns array of iterables into one big function
export const getIterFromArr = (iterArr: IterDescription[], funcsObj: any) => {
  const funcsArr = [];

  for (const { type, args } of iterArr) {
    const func = funcsObj[type];
    if (!func) throw new Error(`could not find function ${func} in funcsObj`);
    if (!args) {
      funcsArr.push(func);
      continue;
    }

    const newArgs = args.map(arg => {
      if (typeof arg !== "object") return arg;
      if (arg.type === 'FUNCTION' && typeof arg.value === 'string') {
        return new Function(arg.value)();
      }
      return arg;
    })
    
    funcsArr.push(func(...newArgs));
  }
  
  return pipe(...funcsArr);
}