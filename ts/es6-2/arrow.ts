/* eslint-disable no-unused-vars */
function Button(id: string) {
  this.element = document.querySelector(`#${id}`);
  this.bindEvent();
}

Button.prototype.bindEvent = function bindEvent() {
  this.element.addEventListener('click', this.setBgColor, false);
};

Button.prototype.setBgColor = function setBgColor() {
  this.element.style.backGroundColor = '#1abc9c';
};

const btn = new (Button as any)('btn');

export {};
