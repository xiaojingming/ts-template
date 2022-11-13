/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
@annotation
class MyClass {}

function annotation(target) {
  target.annotated = true;
}
