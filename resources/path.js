function maCustom() {
  console.log(`J'ai ${API.character.kamas()} kamas.`);
}

const config = {
  "MAX_PODS": 90,
  "GATHERS": [31, 38]
};

const move = [
  {
    map: 8765242,
    gather: true,
    fight: true,
    direction: "top"
  }, {
    map: "-2,0",
    direction: "top|bottom"
  }, {
    map: "-2,0",
    custom: maCustom,
    direction: "right"
  }
];

const bank = [
  {
    map: 8765242,
    direction: "bottom"
  }
];

const phenix = [
  {
    map: 8765242,
    direction: "bottom"
  }
];
