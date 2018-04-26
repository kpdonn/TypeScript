// @strict: true



interface Functor<Container<_T>, A> {
    map<B>(f: (a: A) => B): Container<B>;
}

interface FunctorX<A> extends Functor<FunctorX, A> {
    map<B>(f: (a: A) => B): FunctorX<B>;
    xVal: string;
}

interface FunctorY<A> extends Functor<FunctorY, A> {
    map<B>(f: (a: A) => B): FunctorY<B>;
    yVal: A;
}

declare const initialX: FunctorX<string>;
declare const initialY: FunctorY<string>;

const resultX1 = initialX.map(val => val.length);
const expectX1: FunctorX<number> = resultX1;

const resultY1 = initialY.map(val => val.length);
const expectY1: FunctorY<number> = resultY1;

const resultX2 = initialX.map(val => [val]);
const expectX2: FunctorX<string[]> = resultX2;

const resultY2 = initialY.map(val => [val]);
const expectY2: FunctorY<string[]> = resultY2;
    

function staticMap<F<_T> extends Functor<F, _T>, A, B>(fa: F<A>, f: (a: A) => B): F<B> {
    const result = fa.map(f);
    return result;
}

function staticMapBadImplementation<F<_T> extends Functor<F, _T>, A, B>(fa: F<A>, f: (a: A) => B): F<B> {
    return fa;
}

const resultX3 = staticMap(initialX, val => val.length);
const expectX3: FunctorX<number> = resultX3;

const resultY3 = staticMap(initialY, val => val.length);
const expectY3: FunctorY<number> = resultY3;

const resultX4 = staticMap(initialX, val => [val]);
const expectX4: FunctorX<string[]> = resultX4;

const resultY4 = staticMap(initialY, val => [val]);
const expectY4: FunctorY<string[]> = resultY4;
