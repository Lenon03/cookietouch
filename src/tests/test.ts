import { List } from "linqts";

const test = new List<string>();

test.Add("super");
test.Add("new example");
test.Add("Yaaay!");

const dict = test.ToDictionary((e: string) => e.length);

console.log(dict);
