const data = [
  { name: "a" },
  { name: "b" },
  { name: "c" },
  { name: "e" },
  { name: "f" },
  { name: "g" },
  { name: "h" },
  { name: "i" },
  { name: "j" },
  { name: "k" },
  { name: "l" },
  { name: "m" }
];

const svg = document.getElementById("svg");
const dataMax = d3.max(data);
const width = 500;
const height = 500;

// Entrypoint for d3
