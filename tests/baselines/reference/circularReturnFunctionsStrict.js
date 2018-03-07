//// [circularReturnFunctionsStrict.ts]
function f1() {
  return f2();
}

function f2() {
  return f1();
}


//// [circularReturnFunctionsStrict.js]
"use strict";
function f1() {
    return f2();
}
function f2() {
    return f1();
}
