//// [higherKindedTypesInference.ts]
export declare function stringLength(strarg: string): number;

export interface Functor<AF, Container<_TF> extends Functor<_TF, Container>> {
    map<BF>(f: (a: AF) => BF): Container<BF>;
}

declare function staticMap<C1<_T1> extends Functor<_T1, C1>, A1, B1>(fa1: C1<A1>, fmap1: (a1: A1) => B1): C1<B1>


declare class WeirdFunctor1<X, Y, Z> {
    methodX(): X
    methodY(): Y
    methodZ(): Z

    map<B>(f: (a: Y) => B): WeirdFunctor1<X, B, Z>
}


declare const weird1: WeirdFunctor1<number, string, object>


const result1 = staticMap(weird1, stringLength);
const expected1: WeirdFunctor1<number, number, object> = result1;



//// [higherKindedTypesInference.js]
"use strict";
exports.__esModule = true;
var result1 = staticMap(weird1, stringLength);
var expected1 = result1;
