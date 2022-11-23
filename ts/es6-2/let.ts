/* eslint-disable no-shadow */
for (let i = 0; i < 3; i += 1) {
  // eslint-disable-next-line prefer-const
  let i = 'abc';
  console.log(i);
}

export {};
