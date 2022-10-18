/* eslint-disable no-unused-vars */
/* eslint-disable consistent-return */
/* eslint-disable no-plusplus */
const fs = require('fs');
const path = require('path');

/**
 * 获取指定文件夹下的最大文件的路径
 * @param {string} dir 指定文件夹路径
 * @param {function} cb 回调函数
 */
function findLargest(dir, cb) {
  fs.readdir(dir, (err, files) => {
    if (err) {
      return cb(err);
    }
    let errored = false;
    let { length } = files;
    const stats = [];
    files.forEach((file) => {
      const filename = path.join(dir, file);
      fs.stat(filename, (error, stat) => {
        if (errored) {
          return;
        }
        if (error) {
          errored = true;
          return cb(error);
        }
        stats.push(stat);
        if (--length === 0) {
          const biggest = stats.filter((item) => item.isFile())
            .reduce((prev, cur) => (prev.size > cur.size ? prev : cur));
          cb(null, path.join(dir, files[stats.indexOf(biggest)]));
        }
      });
    });
  });
}

// findLargest(path.join(__dirname, '../', 'ts/topic'), (e, filename) => {
//   if (e) {
//     return console.error(e);
//   }
//   console.log(filename); // D:\前端\ts-template\ts\topic\find.ts
// });

console.log('%c---------------->', 'color: red;');

/**
 * 通过Promise返回指定文件夹下的所有文件名
 * @param {string} dir 指定文件夹路径
 * @returns Promise<filesname[]>
 */
function readDir(dir) {
  return new Promise((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
}

/**
 * 通过Promise返回指定文件的文件信息
 * @param {string} file 指定文件路径
 * @returns 返回指定文件的文件信息
 */
function getStat(file) {
  return new Promise((resolve, reject) => {
    fs.stat(file, (err, info) => {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });
}

function findLargest2(dir) {
  return new Promise((resolve, reject) => {
    readDir(dir).then((files) => Promise.all(files.map((file) => getStat(path.join(dir, file))))
      .then((val) => ({ val, files })))
      .then(({ val, files }) => {
        const biggest = val.filter((v) => v.isFile())
          .reduce((prev, cur) => (prev.size > cur.size ? prev : cur));
        resolve(path.join(dir, files[val.indexOf(biggest)]));
      }).catch((err) => {
        reject(err);
      });
  });
}

findLargest2(path.join(__dirname, '../', 'ts/topic')) // D:\前端\ts-template\ts\topic\find.ts
  .then((i) => console.log(i))
  .catch((err) => console.err(err));

async function findLargest3(dir) {
  const files = await readDir(dir);
  const filesInfo = await Promise.all(files.map((file) => getStat(path.join(dir, file))));
  const biggestFile = filesInfo.filter((fileInfo) => fileInfo.isFile())
    .reduce((prev, cur) => (prev.size > cur.size ? prev : cur));
  return path.join(dir, files[filesInfo.indexOf(biggestFile)]);
}

findLargest3(path.join(__dirname, '../', 'ts/topic')) // D:\前端\ts-template\ts\topic\find.ts
  .then((filename) => console.log(filename))
  .catch((err) => console.err(err));
