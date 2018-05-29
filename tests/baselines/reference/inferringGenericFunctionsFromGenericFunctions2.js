//// [inferringGenericFunctionsFromGenericFunctions2.ts]
export {}

// Borrowed from @gcnew at https://gist.github.com/gcnew/ad833bfa376e4b70fc50a780e3b2d883

interface Collection<T> {
    length: number;
    add(x: T): void;
    remove(x: T): boolean;
}
interface Combinators {
    map<T, U>(c: Collection<T>, f: (x: T) => U): Collection<U>;
    map<T>(c: Collection<T>, f: (x: T) => any): Collection<any>;
    forEach<T>(c: Collection<T>, f: (x: T) => Date): void;
}

declare var _: Combinators;
declare var c2: Collection<number>;

var rf1 = (x: number) => { return x.toFixed() };
var r1a = _.map(c2, (x) => { return x.toFixed() });
var r5 = _.forEach<number>(c2, rf1);  // Should error
var r6 = _.forEach<number>(c2, (x) => { return x.toFixed() }); // Should error
declare const zipWith: <T, S, U>(a: T[], b: S[], f: (x: T) => (y: S) => U) => U[];
declare const pair: <T, S>(x: T) => (y: S) => { x: T; y: S; }
const zr = zipWith([1, 2], ['a', 'b'], pair);

declare function lego1<A, B>(x: A, l: List<B>, y: A): A;
declare function lego2<C, D>(f: (l: List<C>, x: D, y: D) => D): void;
lego2(lego1);

declare function bombastic<R>(f: (x: string, y: number) => R): R;
declare function bombastic2(f: (x: string, y: number) => string): void;
declare function bombastic3<R>(f: (x: string, y: number, z: R) => R): R;
declare function okay<R>(f: (x: 1, y: number) => R): R;
declare function transitive<T>(x: T, f: (x: T) => T): void;

bombastic(id2);  // Should be an error T = [string, number]
bombastic2(id2); // Should be an error T = [string, number]
bombastic<string|number>(id2);  // Should be OK
declare function id3<T>(x: T, y: T, z: T): T;
bombastic3<string|number>(id3);  // Should be OK
okay(id2);
transitive(1, withNum);
transitive('1', withNum);

declare function occurs<R>(f: (x: number, xs: List<number>) => R): R;
occurs(id2);

declare function f15<T extends number>(x: T, f: (x: T) => T): void;
declare function g15(n: number): number;
f15(5, g15);

interface J<T> {
    [s: string]: T;
}

declare function g1<T>(obj: J<T>): T;
const rg1: string = g1({ p: "" });

declare function forEachChild<T>(node: Node, cbNode: (node: Node) => T | undefined, cbNodeArray?: (nodes: NodeArray<Node>) => T | undefined): T | undefined;

class Node {
    _node: any;

    forEachChild<C>(cbNode: (node: Node) => C, cbNodeArray?: (nodes: NodeArray<Node>) => C): C {
        return forEachChild(this, cbNode, cbNodeArray);
    }
}

interface NodeBrand { _nodearray: any }
class Declaration extends Node { _declarationBrand: any; }
class ParameterDeclaration extends Declaration { _paramdecl: any; }
interface Arr<T> {
    concat(...items: T[][]): T[];
    concat(...items: (T | T[])[]): T[];
}
interface NodeArray<T extends Node> extends Arr<T>, NodeBrand { }

declare function indexOf<T>(hay: Arr<T>, needle: T): number;
declare const fps: NodeArray<ParameterDeclaration>;
declare const node: Node;

indexOf(fps, node);

function selfRef<T>(n: number, callback: (n: number) => T): T {
    return selfRef(n, callback);
}

class A { x: any; }
class B extends A { y: any; }
class Chain<T extends A> {
    then<S extends T>(cb: (x: T) => S): Chain<S> {
        return null!;
    }
}

declare const chainB: Chain<B>;
chainB.then(b => new A);


declare function f16(f: (x: number) => 4): void;
declare function g16(x: number): number;
f16(g16);


declare function trans<T>(f: (x: T) => string): number;
// TODO: these should all be noImplicitAny / destructuring erros
trans(({a}) => a);
trans(([b,c]) => 'foo');
trans(({d: [e,f]}) => 'foo');
trans(([{g},{h}]) => 'foo');
trans(({a, b = 10}) => a);

declare function idCreator<T>(f: (x: T|undefined) => T): T;
const icn: number = idCreator(_ => 5); // ZZZ
declare function bar<T, U, V>(x: T, y: U, cb: (x: T, y: U) => V): V;
declare function id2<T>(x: T, y: T): T;
var b1 = bar(1, "one", g);  // Should be number | string
var b2 = bar(1, "one", id2);  // Should be number | string

declare function withNum<N extends number>(x: N): N;
declare function withString<S extends string>(f: (x: S) => S): void;
declare function useString(f: (x: string) => string): void;

withString(withNum);  // Error
useString(withNum);   // Error
declare function f10<T>(x: T): T;
declare function f10<T>(x: T, y: number): T;

const a10: string[] = ["a", "b"];
const b10 = a10.map(f10);

declare function botox<X, Y>(idX: (x: X) => X, idY: (y: Y) => Y): (x: X, y: Y) => [X, Y];
const xyPair: [number, string] = botox(id, id)(3, 'str');
const testPair: { x: number, y: string } = pair(3)('str');

declare function botox2<X, Y>(idX: { a: (x: X) => X }, idY: { a: (y: Y) => Y }): (x: X, y: Y) => [X, Y];

const bottoxObj = { a: id };
const xyPair2: [number, string] = botox2(bottoxObj, bottoxObj)(3, 'str'); // ZZZ
const xyPair3: [number, string] = botox2({ a: id }, { a: id })(3, 'str');


class GenericClass<T> {
    payload: T;
}

var genericObject = new GenericClass<{ greeting: string }>();

function genericFunction<T>(object: GenericClass<T>, callback: (payload: T) => void) {
    callback(object.payload);
}

genericFunction(genericObject, ({greeting}) => {
    var s = greeting.toLocaleLowerCase();  // Greeting should be of type string
});

class Foo<T extends {a: string; b:number;}>{
    test: T;
    constructor(x: T){}
}

var x = new Foo(true); // Should error
var y = new Foo({a: "test", b: 42}); // Should be OK
var z: number = y.test.b;

declare function withFew<a, r>(values: a[], haveFew: (values: a[]) => r, haveNone: (reason: string) => r): r;
function fail(message: string) : never { throw new Error(message); }
const result: number[] = withFew([1, 2, 3], id, fail); // expected result is number[]
type List<T> = { kind: 'nil' }
             | { kind: 'cons', val: T, rest: List<T> }

const Nil = { kind: 'nil' as 'nil' }

declare function cons<C>(x: C, xs: List<C>): List<C>;
declare function foldr<V, A>(list: List<V>, initial: A, f: (x: V, acc: A) => A): A;

function concat<C>(list: List<List<C>>): List<C> {
    return foldr(list, Nil as List<C>, append);
}

function append<L>(xs: List<L>, ys: List<L>): List<L> {
    return foldr(xs, ys, cons);
}

declare function zest<T>(x: T): void;
zest(5); // should be number
function append2<L>(xs: List<L>, ys: List<L>): List<L> {
    return foldr(xs, ys, flip(fconst)); // ZZZ
}

function append3<L>(xs: List<L>, ys: List<L>) {
    return foldr(xs, ys, flip(fconst));
}

function append4<L>(xs: List<L>, ys: List<L>) {
    return foldr(xs, ys, flip(flip(cons)));
}

const infPowa: typeof append = append3; // ZZZ
let jj = <T>(n: T) => 'Error please?';
let myFunc: <T>(n: T) => T = jj;

function foo<T extends Function>(x: T): T { return x; }
const r1 = foo(function (x: string) { return x; });
const r2 = foo((x: string) => x);
const r3 = foo(function (x: any) { return x; });


declare const cb1: { new <T>(x: T): T };
declare const cb2: { new<T>(x: T): number; new<T>(x: number): T; }
declare function foo7<T>(x:T, cb: { new(x: T): string; new(x: T, y?: T): string }): void;

foo7(1, cb1); // Should error
foo7(1, cb2);

function map<A, B>(items: A[], f: (x: A) => B): B[]{
    return items.map(f);
}

var v10: number[] = map([1, 2, 3], id);     // Error if not number[]
function foo3<T, U>(x: T, cb: (a: T) => U, y: U) {
    return cb(x);
}

var r7 = foo3(1, <Z>(a: Z) => '', ''); // string
declare var a: { new <T>(x: T): T; };
function foo2<T, U>(x: T, cb: new(a: T) => U) {
    return new cb(x);
}

var r4b = foo2(1, a); // number

function wf<N extends 5>(n: N, f: (x: 5) => N): N {
    return f(n);
}
const wfr: 5 = wf(5, id);
const wfr2   = wf(4, id); // error
declare function flip<A, B, R>(f: (a: A, b: B) => R): (b: B, a: A) => R;

function id<I>(x: I): I {
    return x;
}

function fconst<X, Y>(x: X, y: Y): X {
    return x;
}

function addStr(x: number, y: string) {
    return x + y;
}

function tagged<T extends string, Q>(tag: T, value: Q): { tag: T, value: Q } {
    return { tag, value };
}

function fbound<T extends Q, Q>(tag: T, value: Q): { tag: T, value: Q } {
    return { tag, value };
}

fbound(4, 4).tag;    // 4 (better) or number
flip(fbound)(4, 4)   // OK
fbound(4, "4");      // Error
flip(fbound)("4", 4) // Error

function of2<a, b>(one: a, two: b): [a, b] {
    return [one, two];
}
const flipped = flip(of2);

// it was working before
const f1 = flip(addStr); // (b: string, a: number) => string
const v1 = f1("hello", 3);
const v2 = id(id)(3); // `3`
// working now
const f2 = flip(id);     // <T>(b: {}, a: T): T
const f3 = flip(fconst); // <Y, X>(b: Y, a: X) => X
const f4 = flip(tagged);   // <Q, T extends string>(b: Q, a: T) => { tag: T, value: Q }
const v3 = f3(1, "qw") // `"qw"`
const v4 = f3([], {})  // `{}`
const v5 = f4(5, "hello"); // { tag: "hello", value: number }
const v6 = f4(5, 5);       // Error as expected
declare function compose<A, B, C>(f: (b: B) => C, g: (a: A) => B): (a: A) => C;

declare const f: <T>(x:number) => T;
declare const g: (x:boolean) => number;
const f5 = compose(f, g)      // OUCH! this gets type `<T>(a: boolean) => T`
declare const g_2: <T>(x: T) => boolean;
declare const f_2: (x: boolean) => number;
const f6 = compose(f_2, g_2)  // <T> (a: T) => number
const f7 = compose(id, x => String(x)) // (a: {}) => string
declare function h<R>(f: (x: number) => R): R;
var z: number = h(id);

const arr: number[] = [1, 2, 3].map(id);

declare const val1: string | undefined;
declare function cleanse<T>(x: T|undefined): x is T;

cleanse(val1);

class MyClass
{
  one(c: boolean){};
  two(){};
}

declare const test: PickPrototype<typeof MyClass, 'one'>;
type PickPrototype<T extends { prototype: any }, K extends keyof T['prototype']> = {
    [P in K]: T['prototype'][P];
}


function wrap<T>(innerFunc: (data: T) => any) {
    return (data:T) => innerFunc(data);
}

function inner(x:number) {};
inner(2);

let func = wrap(inner);
func(2);


declare function union<A, B, C>(f: (a: A|B|C, b: A|B|C, c: A|B|C) => void): void;
union(<X, Y, Z>(x: X, y: Y, z: Z) => x)

declare function union2<A, B, C>(f: (a: A, b: B, c: C) => void): void;
union2(<X, Y, Z>(x: X|Y|Z, y: X|Y|Z, z: X|Y|Z) => x);

declare function union3<A, B>(f: (a: A|string, b: A|number) => B): B;
declare function uParam31<X>(x: X|number, y: X|string): X;
declare function uParam32(x: number, y: number|string): void;
declare function uParam33(x: string, y: number|string): void;
union3(uParam31);  // error;  A,X = [number, string]
union3(uParam32);  // error
union3(uParam33);  // OK;     A = string; B = void
declare function union4<A, B, C>(f: (b: A|B) => C, a: A): C;
declare function uParam41(y: number|string): void;
declare function uParam42<X>(y: number|X): X;
declare function uParam43<X>(y: string|X): X;
union4(uParam41, 4); // A = number, B = string, C = void
union4(uParam42, 4); // A = number, B = X, C = X
union4(uParam43, 4); // A = number, B = string, C = number

//// [inferringGenericFunctionsFromGenericFunctions2.js]
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var rf1 = function (x) { return x.toFixed(); };
var r1a = _.map(c2, function (x) { return x.toFixed(); });
var r5 = _.forEach(c2, rf1); // Should error
var r6 = _.forEach(c2, function (x) { return x.toFixed(); }); // Should error
var zr = zipWith([1, 2], ['a', 'b'], pair);
lego2(lego1);
bombastic(id2); // Should be an error T = [string, number]
bombastic2(id2); // Should be an error T = [string, number]
bombastic(id2); // Should be OK
bombastic3(id3); // Should be OK
okay(id2);
transitive(1, withNum);
transitive('1', withNum);
occurs(id2);
f15(5, g15);
var rg1 = g1({ p: "" });
var Node = /** @class */ (function () {
    function Node() {
    }
    Node.prototype.forEachChild = function (cbNode, cbNodeArray) {
        return forEachChild(this, cbNode, cbNodeArray);
    };
    return Node;
}());
var Declaration = /** @class */ (function (_super) {
    __extends(Declaration, _super);
    function Declaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Declaration;
}(Node));
var ParameterDeclaration = /** @class */ (function (_super) {
    __extends(ParameterDeclaration, _super);
    function ParameterDeclaration() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ParameterDeclaration;
}(Declaration));
indexOf(fps, node);
function selfRef(n, callback) {
    return selfRef(n, callback);
}
var A = /** @class */ (function () {
    function A() {
    }
    return A;
}());
var B = /** @class */ (function (_super) {
    __extends(B, _super);
    function B() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return B;
}(A));
var Chain = /** @class */ (function () {
    function Chain() {
    }
    Chain.prototype.then = function (cb) {
        return null;
    };
    return Chain;
}());
chainB.then(function (b) { return new A; });
f16(g16);
// TODO: these should all be noImplicitAny / destructuring erros
trans(function (_a) {
    var a = _a.a;
    return a;
});
trans(function (_a) {
    var b = _a[0], c = _a[1];
    return 'foo';
});
trans(function (_a) {
    var _b = _a.d, e = _b[0], f = _b[1];
    return 'foo';
});
trans(function (_a) {
    var g = _a[0].g, h = _a[1].h;
    return 'foo';
});
trans(function (_a) {
    var a = _a.a, _b = _a.b, b = _b === void 0 ? 10 : _b;
    return a;
});
var icn = idCreator(function (_) { return 5; }); // ZZZ
var b1 = bar(1, "one", g); // Should be number | string
var b2 = bar(1, "one", id2); // Should be number | string
withString(withNum); // Error
useString(withNum); // Error
var a10 = ["a", "b"];
var b10 = a10.map(f10);
var xyPair = botox(id, id)(3, 'str');
var testPair = pair(3)('str');
var bottoxObj = { a: id };
var xyPair2 = botox2(bottoxObj, bottoxObj)(3, 'str'); // ZZZ
var xyPair3 = botox2({ a: id }, { a: id })(3, 'str');
var GenericClass = /** @class */ (function () {
    function GenericClass() {
    }
    return GenericClass;
}());
var genericObject = new GenericClass();
function genericFunction(object, callback) {
    callback(object.payload);
}
genericFunction(genericObject, function (_a) {
    var greeting = _a.greeting;
    var s = greeting.toLocaleLowerCase(); // Greeting should be of type string
});
var Foo = /** @class */ (function () {
    function Foo(x) {
    }
    return Foo;
}());
var x = new Foo(true); // Should error
var y = new Foo({ a: "test", b: 42 }); // Should be OK
var z = y.test.b;
function fail(message) { throw new Error(message); }
var result = withFew([1, 2, 3], id, fail); // expected result is number[]
var Nil = { kind: 'nil' };
function concat(list) {
    return foldr(list, Nil, append);
}
function append(xs, ys) {
    return foldr(xs, ys, cons);
}
zest(5); // should be number
function append2(xs, ys) {
    return foldr(xs, ys, flip(fconst)); // ZZZ
}
function append3(xs, ys) {
    return foldr(xs, ys, flip(fconst));
}
function append4(xs, ys) {
    return foldr(xs, ys, flip(flip(cons)));
}
var infPowa = append3; // ZZZ
var jj = function (n) { return 'Error please?'; };
var myFunc = jj;
function foo(x) { return x; }
var r1 = foo(function (x) { return x; });
var r2 = foo(function (x) { return x; });
var r3 = foo(function (x) { return x; });
foo7(1, cb1); // Should error
foo7(1, cb2);
function map(items, f) {
    return items.map(f);
}
var v10 = map([1, 2, 3], id); // Error if not number[]
function foo3(x, cb, y) {
    return cb(x);
}
var r7 = foo3(1, function (a) { return ''; }, ''); // string
function foo2(x, cb) {
    return new cb(x);
}
var r4b = foo2(1, a); // number
function wf(n, f) {
    return f(n);
}
var wfr = wf(5, id);
var wfr2 = wf(4, id); // error
function id(x) {
    return x;
}
function fconst(x, y) {
    return x;
}
function addStr(x, y) {
    return x + y;
}
function tagged(tag, value) {
    return { tag: tag, value: value };
}
function fbound(tag, value) {
    return { tag: tag, value: value };
}
fbound(4, 4).tag; // 4 (better) or number
flip(fbound)(4, 4); // OK
fbound(4, "4"); // Error
flip(fbound)("4", 4); // Error
function of2(one, two) {
    return [one, two];
}
var flipped = flip(of2);
// it was working before
var f1 = flip(addStr); // (b: string, a: number) => string
var v1 = f1("hello", 3);
var v2 = id(id)(3); // `3`
// working now
var f2 = flip(id); // <T>(b: {}, a: T): T
var f3 = flip(fconst); // <Y, X>(b: Y, a: X) => X
var f4 = flip(tagged); // <Q, T extends string>(b: Q, a: T) => { tag: T, value: Q }
var v3 = f3(1, "qw"); // `"qw"`
var v4 = f3([], {}); // `{}`
var v5 = f4(5, "hello"); // { tag: "hello", value: number }
var v6 = f4(5, 5); // Error as expected
var f5 = compose(f, g); // OUCH! this gets type `<T>(a: boolean) => T`
var f6 = compose(f_2, g_2); // <T> (a: T) => number
var f7 = compose(id, function (x) { return String(x); }); // (a: {}) => string
var z = h(id);
var arr = [1, 2, 3].map(id);
cleanse(val1);
var MyClass = /** @class */ (function () {
    function MyClass() {
    }
    MyClass.prototype.one = function (c) { };
    ;
    MyClass.prototype.two = function () { };
    ;
    return MyClass;
}());
function wrap(innerFunc) {
    return function (data) { return innerFunc(data); };
}
function inner(x) { }
;
inner(2);
var func = wrap(inner);
func(2);
union(function (x, y, z) { return x; });
union2(function (x, y, z) { return x; });
union3(uParam31); // error;  A,X = [number, string]
union3(uParam32); // error
union3(uParam33); // OK;     A = string; B = void
union4(uParam41, 4); // A = number, B = string, C = void
union4(uParam42, 4); // A = number, B = X, C = X
union4(uParam43, 4); // A = number, B = string, C = number
