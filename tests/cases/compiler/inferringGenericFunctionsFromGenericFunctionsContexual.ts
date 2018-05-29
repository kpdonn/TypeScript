// @strict: true
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
