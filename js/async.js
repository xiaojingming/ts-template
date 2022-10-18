const fs = require('fs');
const path = require('path');

function findLargest(dir, cb) {
  fs.readdir(dir, (err, files) => {
    console.log(files);
  });
}

findLargest('./');
