const config = {
  MAX_PODS: 90
};

const move = [
  { map: currentMapId(), custom: test }
];

async function* test() {
  printMessage("Let's go!");
  yield* await gather(38);
  printMessage("Finish Gather!");
  yield* await delay(2000);
  printMessage("All Finish!");
}
