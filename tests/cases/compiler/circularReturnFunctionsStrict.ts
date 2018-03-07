// @strict: true

function f1() {
  return f2();
}

function f2() {
  return f1();
}
