const config = {
  MAX_PODS: 90,
  MIN_MONSTERS: 3
}


const move = [
      { map: "5,-1", fight: true, path: "bottom|left|right" },
      { map: "6,-1", fight: true, path: "bottom|left" },
      { map: "6,0", fight: true, path: "top|bottom|left|right" },
      { map: "6,1", fight: true, path: "top|bottom|left|right" },
      { map: "5,1", fight: true, path: "top|bottom|left|right" },
      { map: "5,0", fight: true, path: "top|bottom|left|right" },
      { map: "4,-1", fight: true, path: "bottom|right" },
      { map: "4,0", fight: true, path: "top|bottom|right" },
      { map: "4,1", fight: true, path: "top|bottom|right" },
      { map: "4,2", fight: true, path: "top|right" },
      { map: "5,2", fight: true, path: "top|left|right" },
      { map: "6,2", fight: true, path: "top|left|right" },
      { map: "7,2", fight: true, path: "top|left|right" },
      { map: "8,2", fight: true, path: "top|left" },
      { map: "8,1", fight: true, path: "bottom|left" },
      { map: "7,1", fight: true, path: "top|bottom|left|right" },
      { map: "7,0", fight: true, path: "bottom|left" },
]
