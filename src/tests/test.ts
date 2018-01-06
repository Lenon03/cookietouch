// import { List } from "linqts";
//
// const test = new List<string>();
//
// test.Add("super");
// test.Add("new example");
// test.Add("Yaaay!");
//
// const dict = test.ToDictionary((e: string) => e.length);
//
// console.log(dict);

import ResetEvent from "../cookie/utils/ResetEvent";

const resetEvent = new ResetEvent();

let x = 0;

const t1 = resetEvent.wait(() => {
  x += 1;
  console.log(`t1: ${t1.elapsed()}`);
});

console.log(`out t1: ${t1.elapsed()}`);

setTimeout(() => {
  resetEvent.wait(() => {
    console.log(`In wait ${x}`);
    console.log(`t2: ${t1.elapsed()}`);
  });
}, 1000);

x++;

console.log(`Out wait ${x}`);

resetEvent.set();
