const fetchData = (value) => new Promise((resolve) => {
  setTimeout(resolve, 1000, value + 1);
});

const fetchValue = async (val) => {
  const value1 = await fetchData(val);
  const value2 = await fetchData(value1);
  const value3 = await fetchData(value2);
  console.log(value3);
};

fetchValue(1);
