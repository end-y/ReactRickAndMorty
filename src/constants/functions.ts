import { FuncType } from "../types/constants";


export function debounce(func: FuncType, delay: number): FuncType {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function(this: any, ...args: any[]) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}