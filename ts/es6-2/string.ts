/* eslint-disable no-tabs */
/* eslint-disable no-debugger */
/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
const x = 'Hi';
const y = 'xiao';

function msg(...params: any[]) {
  const literals: string[] = params[0];
  const args = params.slice(1);
  let i = 0;
  return literals.reduce((prev, cur) => {
    prev += cur === '' ? args[i++] : cur;
    return prev;
  }, '');
}

console.log(msg`${x}, I am ${y}`);
console.log('%c---------------->', 'color: red;');

function oneLine(...params: any[]) {
  const literals: string[] = params[0];
  return literals.reduce((prev, cur) => {
    prev += cur;
    return prev;
  }, '').replaceAll(/(\s)+/g, ' ').trim();
}

const msg1 = oneLine`
    Hi,
    Daisy!
    I am
    Kevin.
`;
console.log(msg1); // Hi, Daisy! I am Kevin.
console.log('%c---------------->', 'color: red;');

const msg2 = oneLine`
  Preserve eg sentences.  Double
  spaces within input lines.
`;
console.log(msg2);
console.log('%c---------------->', 'color: red;');

function stripIndents(...params: any[]) {
  const literals: string[] = params[0];
  return literals.reduce((prev, cur) => {
    prev += cur;
    return prev;
  }, '').replaceAll(/(\s)+/g, '\n').trim();
}

console.log(stripIndents`
	<span>1<span>
	<span>2<span>
		<span>3<span>
`);
console.log('%c---------------->', 'color: red;');

function stripIndent(...params: any[]) {
  const literals: string[] = params[0];
  const reg = /^(\s)+/gm;
  const str = literals.reduce((prev, cur) => {
    prev += cur;
    return prev;
  }, '');
  const res = str.match(reg);
  let min = 0;
  if (res) {
    min = Math.min.apply(null, res.map((i) => i.length));
  }
  const $reg = new RegExp(`^.{${min}}`, 'gm');
  return str.replaceAll($reg, '');
}

console.log(stripIndent`
	  <ul>
		  <li>1</li>
		  <li>2</li>
		  <li>3</li>
	  <ul>
`);

export {};
