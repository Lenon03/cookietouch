const config = {
  MAX_PODS: 90
}

const move = [
  {
    map: "-3,1",
    custom: () => {
      console.log(API.character.kamas);
      fight();
    }
  }
]
