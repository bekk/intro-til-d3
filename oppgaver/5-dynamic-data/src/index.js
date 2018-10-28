const data = [
  { name: "a", value: 5 },
  { name: "b", value: 10 },
  { name: "c", value: 1 },
  { name: "e", value: 3 },
  { name: "f", value: 2 },
  { name: "g", value: 1 },
  { name: "h", value: 4 },
  { name: "i", value: 2 },
  { name: "j", value: 7 }
];

const dataMax = d3.max(data);
const width = 800;
const height = 500;

function updateChart() {
  // Entrypoint for d3
}

updateChart(data);

let counter = 0;

const updateData = () => {
  const push = Math.random() < 0.5;
  const verdi = Math.floor(Math.random() * 10);
  const index = Math.floor(Math.random() * data.length);

  const min = 4;
  const max = 12;

  const action =
    Math.random() < 0.5
      ? "change"
      : data.length <= min || (data.length <= max && Math.random() < 0.5)
        ? "push"
        : "pop";

  const dataAsString = data.map(e => `${e.name}:${e.value}`).join(" ");

  console.log(
    `updateData ${action} index=${index} verdi=${verdi} \n${dataAsString}`
  );

  if (action == "change") {
    data[index].value = verdi;
  } else if (action == "push") {
    const navn = "x" + counter++;
    data.splice(index, 0, { name: navn, value: verdi });
  } else if (action == "pop") {
    data.splice(index, 1);
  }

  updateChart(data);
};

window.setInterval(updateData, 500);
