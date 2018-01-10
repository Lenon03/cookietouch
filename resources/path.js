function maCustom() {
  console.log(`J'ai ${API.character.kamas} kamas.`);
}

const config = {
  MAX_PODS: 90
};

const move = [
  {
    map: "3,1",
    custom: maCustom,
    direction: "right"
  }, {
    map: "4,1",
    custom: maCustom,
    direction: "bottom"
  }, {
    map: "4,2",
    custom: maCustom,
    direction: "left"
  }, {
    map: "3,2",
    custom: maCustom,
    direction: "top"
  }
];
