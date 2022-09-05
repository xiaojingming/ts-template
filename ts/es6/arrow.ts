/* eslint-disable prefer-rest-params */
/* eslint-disable no-unused-vars */
function Button(id: string) {
  console.log(new.target === Button); // true
  this.element = document.querySelector(id);
  this.bindEvent();
}

Button.prototype.setStyle = function setStyle() {
  (this.element as HTMLButtonElement).style.color = '#58bc58';
};
Button.prototype.bindEvent = function bindEvent() {
  (this.element as HTMLButtonElement).addEventListener('click', () => this.setStyle());
};

const btn = new (Button as any)('#btn');

function constant(params: any) {
  return () => arguments[0];
}
console.log(constant(1)());
export {};
