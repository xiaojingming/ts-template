/* eslint-disable no-underscore-dangle */
/* eslint-disable no-plusplus */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
import fs, { PathLike } from 'fs';
import path from 'path';
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * 获取指定文件夹下的最大文件
 * @param dir 文件夹路径
 * @param cb 回调函数
 */
function findLargest(dir: PathLike, cb: (...res: any[]) => void) {
  // 读取目录下的所有文件
  fs.readdir(dir, (er, files) => {
    if (er) {
      return cb(er);
    }
    let counter = files.length;
    let errored = false;
    const stats: fs.Stats[] = [];
    files.forEach((file, index) => {
      // 读取文件信息
      fs.stat(path.join((dir as string), file), (err, stat) => {
        if (errored) return;
        if (err) {
          errored = true;
          return cb(err);
        }
        stats[index] = stat;
        // 事先算好有多少个文件，读完 1 个文件信息，计数减 1，当为 0 时，说明读取完毕，此时执行最终的比较操作
        if (--counter === 0) {
          const largest = stats
            .filter((statsItem) => statsItem.isFile())
            .reduce((prev, next) => ((prev.size > next.size) ? prev : next));
          cb(null, files[stats.indexOf(largest)]);
        }
      });
    });
  });
}
// findLargest(path.join(__dirname), (err, fileName) => {
//   if (err) {
//     return console.error(err);
//   }
//   console.log(`largest file is ${fileName}`); // largest file is set.ts
// });

const readDir = function readDir(dir: PathLike) {
  return new Promise<string[]>((resolve, reject) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        reject(err);
      }
      resolve(files);
    });
  });
};
const statFile = function statFile(dir: PathLike) {
  return new Promise<fs.Stats>((resolve, reject) => {
    fs.stat(dir, (err, stat) => {
      if (err) {
        reject(err);
      }
      resolve(stat);
    });
  });
};
// readDir(path.join(__dirname))
//   .then((files) => {
//     const filelistsPromise = files.map((file) => statFile(path.join(__dirname, file)));
//     return Promise.all(filelistsPromise).then((res) => ({
//       stats: res,
//       files,
//     }));
//   }).then(({ stats, files }) => {
//     const largest = stats
//       .filter((item) => item.isFile())
//       .reduce((prev, cur) => (prev.size > cur.size ? prev : cur));
//     return files[stats.indexOf(largest)];
//   }).then((filname) => console.log(filname)); // set.ts

console.log(1);
Promise.resolve(1).then(() => console.log(2));
console.log(3);

export {};
