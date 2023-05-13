import { sideEffect1 } from "./side-effects";
import type { Result1 } from "./result-1";
import type { Result2 } from "./result-2";

function doSomething1(): Result1 {
  sideEffect1();
  return {
    prop1: "hoge",
    prop2: 2,
  };
}

function doSomething2(): Result2 {
  sideEffect1();
  return {
    prop1: 3,
    prop2: "hoge",
  };
}

export { doSomething1, doSomething2, Result1, Result2 };
