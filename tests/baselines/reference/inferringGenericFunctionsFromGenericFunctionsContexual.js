//// [inferringGenericFunctionsFromGenericFunctionsContexual.ts]
export {}

declare function identity1<T, U>(f: (t: T) => U): (t2: T) => U
const id1 = identity1(x => x)


declare function identity2<T>(f: T): T
const id2 = identity2(x => x)


declare function identity3<T extends number, U>(f: (t: T) => U): (t2: T) => U
const id3 = identity3(x => x)





declare function compose<A, B, C>(f: (x: A) => B, g: (y: B) => C): (x: A) => C;

{
    let composed1 = compose(x => x, x2 => x2)
    const expectedComposed1: <U>(u: U) => U = composed1;
    const callComposed1 = composed1("test");
    const expectedCallComposed1 : string = callComposed1;
}

{
    let composed2 = compose(x => x, x2 => [x2])
    const expectedComposed2: <U>(u: U) => U[] = composed2;
    const callComposed2 = composed2("test");
    const expectedCallComposed2: string[] = callComposed2;
}

{
    let composed3 = compose(x => [x], x2 => x2)
    const expectedComposed3: <U>(u: U) => U[] = composed3;
    const callComposed3 = composed3("test");
    const expectedCallComposed3 : string[] = callComposed3;
}

{
    let composed4 = compose(x => [x], x2 => ({ boxed: x2 }));
    const expectedComposed4: <U>(u: U) => {boxed: U[]} = composed4;
    const callComposed4 = composed4("test");
    const expectedCallComposed4 : {boxed: string[]} = callComposed4;
}


//// [inferringGenericFunctionsFromGenericFunctionsContexual.js]
"use strict";
exports.__esModule = true;
var id1 = identity1(function (x) { return x; });
var id2 = identity2(function (x) { return x; });
var id3 = identity3(function (x) { return x; });
{
    var composed1 = compose(function (x) { return x; }, function (x2) { return x2; });
    var expectedComposed1 = composed1;
    var callComposed1 = composed1("test");
    var expectedCallComposed1 = callComposed1;
}
{
    var composed2 = compose(function (x) { return x; }, function (x2) { return [x2]; });
    var expectedComposed2 = composed2;
    var callComposed2 = composed2("test");
    var expectedCallComposed2 = callComposed2;
}
{
    var composed3 = compose(function (x) { return [x]; }, function (x2) { return x2; });
    var expectedComposed3 = composed3;
    var callComposed3 = composed3("test");
    var expectedCallComposed3 = callComposed3;
}
{
    var composed4 = compose(function (x) { return [x]; }, function (x2) { return ({ boxed: x2 }); });
    var expectedComposed4 = composed4;
    var callComposed4 = composed4("test");
    var expectedCallComposed4 = callComposed4;
}
