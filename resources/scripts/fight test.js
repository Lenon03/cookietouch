const config = {
  DISPLAY_FIGHT_COUNT: true,
  MAX_PODS: 90,
}

const move = [
  { map: "-2,2", path: "bottom" },
  { map: "0,3", fight: true, path: "right" },
  { map: "1,3", fight: true, path: "right" },
  { map: "2,3", fight: true, path: "bottom" },
  { map: "2,4", fight: true, path: "left" },
  { map: "1,4", fight: true, path: "left" },
  { map: "0,4", fight: true, path: "top" }
]
