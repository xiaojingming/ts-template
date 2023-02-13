function Button(id: string) {
  this.element = document.querySelector(`#${id}`);
  this.bindEvent();
}

Button.prototype.bindEvent = function f() {
  this.element.addEventListener('click', () => this.setBgColor(), false);
};

Button.prototype.setBgColor = function fn() {
  this.element.style.backgroundColor = '#1abc9c';
};

const button = new (Button as any)('btn');
console.log(button);

export {};
