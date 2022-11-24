/* eslint-disable no-unused-vars */
/* eslint-disable no-tabs */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-expressions */
const arr = [{
  value: 1,
}, {
  value: 2,
}];

const message = `
  <ul>
    ${arr.map((item) => `<li>${item.value}</li>`).join('\n')}
  </ul>
`;
console.log(message);

const x = 'Hi';
const y = 'xiao';

function msg(literals: string[], ...v: string[]) {
  let result = '';
  result = literals.reduce((prev, cur, cIndex) => {
    prev += cur + (v[cIndex] || '');
    return prev;
  }, result);
  result = result.replace(/(\n\s*)/g, ' ').trim();
  return result;
}

console.log(msg`
  Hi,
	xiao!
	I am
	xjm.
`);

console.log(msg`
  Preserve eg sentences.  Double
  spaces within input lines.
`);

function stripIndents(literals: string[], ...v: string[]) {
  let result = '';
  result = literals.reduce((prev, cur, cIndex) => {
    prev += cur + (v[cIndex] || '');
    return prev;
  }, result);
  // result = result.replace(/\n[^\S\n]*/g, '\n').trim();
  result = result.replace(/[^\S\n]*/gm, '').trim(); // 空白字符去除换行符
  return result;
}

console.log(stripIndents`
	<span>1<span>
	<span>2<span>
		<span>3<span>
`);

function stripIndent(literals: string[], ...v: string[]) {
  let result = '';
  result = literals.reduce((prev, cur, cIndex) => {
    prev += cur + (v[cIndex] || '');
    return prev;
  }, result);
  const match = result.match(/^[^\S\n]*(?=\S)/gm);
  const indent = match && Math.min.apply(null, match.map((e) => e.length));
  if (indent) {
    const reg = new RegExp(`^.{${indent}}`, 'gm');
    result = result.replace(reg, '');
  }
  return result;
}

console.log(stripIndent`
	<ul>
		<li>1</li>
		<li>2</li>
		<li>3</li>
	<ul>
`);

export {};
