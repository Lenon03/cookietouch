const config = {
  MAX_PODS: 90
};

const move = [
  {
    map: "3,1",
    direction: "right",
    fight: true,
    custom: () => {
      console.log(API);
    }
  }, {
    map: "4,1",
    direction: "bottom",
    fight: true,
  }, {
    map: "4,2",
    direction: "left",
    fight: true,
  }, {
    map: "3,2",
    direction: "top",
    fight: true,
  }
];
