const counter = {
  value: 3,
};
function incCounter() {
  counter.value += 1;
}

module.exports = {
  counter,
  incCounter,
};
