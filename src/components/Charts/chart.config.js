export const chartColors = {
  default: {
    primary: "#00D1B2",
    info: "#209CEE",
    danger: "#FF3860",
  },
};

const randomChartData = (n) => {
  const data = [];

  for (let i = 0; i < n; i++) {
    data.push(Math.round(Math.random() * 200));
  }

  return data;
};

const datasetObject = (color, points, label) => {
  return {
    fill: false,
    label: label || color.toUpperCase(),
    borderColor: chartColors.default[color],
    borderWidth: 2,
    borderDash: [],
    borderDashOffset: 0.0,
    pointBackgroundColor: chartColors.default[color],
    pointBorderColor: "rgba(255,255,255,0)",
    pointHoverBackgroundColor: chartColors.default[color],
    pointBorderWidth: 20,
    pointHoverRadius: 4,
    pointHoverBorderWidth: 40,
    pointRadius: 4,
    data: randomChartData(points),
    tension: 0.5,
    cubicInterpolationMode: "default",
  };
};

// export const sampleChartData = (points = 20) => {
//   const labels = [];

//   for (let i = 1; i <= points; i++) {
//     labels.push(`第${i}天`);
//   }

//   return {
//     labels,
//     datasets: [
//       datasetObject("primary", points, 'A公司中招次数'),
//       datasetObject("info", points, 'B公司中招次数'),
//       datasetObject("danger", points, 'C公司中招次数'),
//     ],
//   };
// };

export const sampleChartData = (points = 20) => {
  const labels = [];
  const today = new Date();

  for (let i = points - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    labels.push(`${year}-${month}-${day}`);
  }

  return {
    labels,
    datasets: [
      datasetObject("primary", points, 'A公司中招次数'),
      datasetObject("info", points, 'B公司中招次数'),
      datasetObject("danger", points, 'C公司中招次数'),
    ],
  };
};