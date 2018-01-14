function* fightFunc() {
  console.log("before fight");
  if (API.fight.fight()) {
    console.log("start fight");
    yield;
    console.log("finish fight");
  } else {
    console.log("no fight");
  }
}
