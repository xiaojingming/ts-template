/* eslint-disable no-tabs */
const x = 'Hi';
const y = 'Kevin';

function message(literals: string[], ...values: string[]) {
  return literals.reduce((prev, cur, index) => prev + values[index - 1] + cur);
}

const res = message`${x}, I am ${y}`;
console.log(res); // Hi, I am Kevin
console.log('%c---------------->', 'color: red;');

const message1 = `
	Hi,
	Daisy!
	I am
	Kevin.
`;

function oneLine(literals: string[], ...values: string[]) {
  let result = literals.reduce((prev, cur, index) => prev + values[index - 1] + cur);
  // 将换行符转化为一个空格，再使用trim去除
  result = result.replace(/(\n\s+)/g, ' ');
  return result.trim();
}

const res1 = oneLine`${message1}`;
console.log(res1);

const res2 = oneLine`
  Preserve eg sentences.  Double
  spaces within input lines.
`;
console.log(res2);
console.log('%c---------------->', 'color: red;');

const html1 = `
	<span>1<span>
	<span>2<span>
		<span>3<span>
`;

function stripIndents(literals: string[], ...values: string[]) {
  let result = literals.reduce((prev, cur, index) => prev + values[index - 1] + cur);
  result = result.replace(/^[^\S\n]*/gm, '');
  return result.trim();
}

const res3 = stripIndents`${html1}`;
console.log(res3);
console.log('%c---------------->', 'color: red;');

const html2 = `
  <ul>
	  <li>1</li>
	  <li>2</li>
	  <li>3</li>
	<ul>
`;
function stripIndent(literals: string[], ...values: string[]) {
  let result = literals.reduce((prev, cur, index) => prev + values[index - 1] + cur);
  const reg = /^([^\S\n])*(?=\S)/gm;
  const match = result.match(reg);
  const indent = match && Math.min.apply(null, match.map((item) => item.length));
  console.log(indent);
  if (indent) {
    const regexp = new RegExp(`^.{${indent}}`, 'gm');
    result = result.replace(regexp, '');
  }
  return result.trim();
}
const res4 = stripIndent`${html2}`;
console.log(res4);

export {};
