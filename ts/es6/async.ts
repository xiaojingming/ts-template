/* eslint-disable no-return-await */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-debugger */
/* eslint-disable no-promise-executor-return */
/* eslint-disable no-unused-vars */
const fetchData = () => new Promise<number>((resolve) => setTimeout(resolve, 1000, 1));
const fetchMoreData = (value: number) => new Promise
  <number>((resolve) => setTimeout(resolve, 1000, value + 1));
const fetchMoreData2 = (value: number) => new Promise
  <number>((resolve) => setTimeout(resolve, 1000, value + 2));

// function fetch() {
//   return fetchData()
//     .then((val1) => {
//       console.log(val1, 'val1');
//       return fetchMoreData(val1);
//     })
//     .then((val2) => {
//       console.log(val2, 'val2');
//       return fetchMoreData2(val2);
//     });
// }

async function fetch() {
  const val1 = await fetchData();
  const val2 = await fetchMoreData(val1);
  return fetchMoreData2(val2);
}

// const res = fetch();
// console.log(res);

function fetchUrl(val: number, time: number) {
  return new Promise<string>((resolve) => {
    setTimeout(resolve, time, val);
  });
}
async function loadData(urls: number[]) {
  for (const url of urls) {
    const res = await fetchUrl(url, 1000);
    console.log(res);
  }
}
// loadData([1, 2, 3]);

function loadData2(urls: number[]) {
  const resArr = urls.map(async (url) => await fetchUrl(url, 1000));
  for (const key of resArr) {
    console.log(key);
  }
}
loadData2([1, 2, 3]);

export { };
