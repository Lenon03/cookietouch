function* fight() {
  console.log("before fight");
  if (Math.random() < 0.5 ? true : false) {
    console.log("start fight");
    yield;
    console.log("finish fight");
  } else {
    console.log("no fight");
  }
}

function test() {
  console.log("test");
  fight();
}

function* testCo() {
  console.log("test");
  yield* fight();
}

const ex = testCo();

console.log(ex.next());

// let result: IteratorResult<void>;
// do {
//   result = ex.next();
//   console.log(result);
// } while (!result.done);
