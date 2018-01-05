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

resetEvent.wait(() => {
  x += 1;
});

resetEvent.wait(() => {
  console.log(`In wait ${x}`); // 2
});

x++;

console.log(`Out wait ${x}`);

resetEvent.set();
