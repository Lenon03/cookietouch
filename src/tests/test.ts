function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function parse(text: string) {
  const REGEX_SPECIFIC = /(top|haut|right|droite|bottom|bas|left|gauche)\((\d{1,3})\)/;
  const REGEX_DIRECTIONS = /(top|haut|right|droite|bottom|bas|left|gauche)/;
  const REGEX_CELLID = /(\d{1,3})/;

  const parts = text.split("|");
  const randomPart = parts[getRandomInt(0, parts.length - 1)];
  // Specific direction
  const m = text.match(REGEX_SPECIFIC);
  if (m) {
    console.log(`Direction: ${m[1]} | Cell: ${m[2]}`);
  }
}

parse("haut(123)");

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

// import ResetEvent from "../cookie/utils/ResetEvent";
//
// const resetEvent = new ResetEvent();
//
// let x = 0;
//
// const t1 = resetEvent.wait(() => {
//   x += 1;
//   console.log(`t1: ${t1.elapsed()}`);
// });
//
// console.log(`out t1: ${t1.elapsed()}`);
//
// setTimeout(() => {
//   resetEvent.wait(() => {
//     console.log(`In wait ${x}`);
//     console.log(`t2: ${t1.elapsed()}`);
//   });
// }, 1000);
//
// x++;
//
// console.log(`Out wait ${x}`);
//
// resetEvent.set();
