//// [higherKindedTypesLift.ts]
export interface Functor<AF, Container<_TF>> {
    map<BF>(f: (a: AF) => BF): Container<BF>;
}

class FunctorX<AX> implements Functor<AX, FunctorX> {
    constructor(private elements: AX[]) {}
    map<BX>(f: (a: AX) => BX): FunctorX<BX> {
        const mappedElements = this.elements.map(f);
        return new FunctorX(mappedElements);
    }

    firstVal(): AX | undefined {
        return this.elements.length ? this.elements[0] : undefined;
    };
}


interface StaticFunctor<CS<_TS>> {
    <AS, BS>(csas: CS<AS>, fmapstatic: (as: AS) => BS): CS<BS>;
}


interface LiftedResult<LRC<_LT>> {
    <LRA, LRB>(lrmap: (lra: LRA) => LRB): <NC<_NT> extends LRC<_NT>>(lrclra: NC<LRA>) => NC<LRB>
}

function lift<C<_TL>>(fToLift: StaticFunctor<C>): LiftedResult<C> {
    return lmap => lca => fToLift(lca, lmap);
}

function staticMap<C1<_T1> extends Functor<_T1, C1>, A1, B1>(fa1: C1<A1>, fmap1: (a1: A1) => B1): C1<B1> {
    return fa1.map(fmap1);
}

const liftedFunctor = lift(staticMap);

function stringLength(strarg: string): number {
    return strarg.length;
}

const liftedStringLength = liftedFunctor(stringLength);

const functorXString = new FunctorX(["myFunctorX"]);

const result = liftedStringLength(functorXString);
const expectedType: FunctorX<number> = result;

const expectError = liftedStringLength(result);



export interface DiffFunctor<DA, DContainer<_TD>> {
    diffMap<DB>(df: (da: DA) => DB): DContainer<DB>;
}

declare class DiffFunctorY<AY> implements DiffFunctor<AY, DiffFunctorY> {

    diffMap<BY>(f: (a: AY) => BY): DiffFunctorY<BY>

    firstValY(): AY | undefined
}

declare const diffFunctorYString: DiffFunctorY<string>;
// should have error because DiffFunctorY has diffMap function, not "map" as needed because liftedFunctor was created from staticMap which declared Functor
const expectError2 = liftedStringLength(diffFunctorYString);


declare class InvalidFunctor<IA> {
    // does not actually implement Functor because it doesn't return InvalidFunctor<IB>
    map<IB>(fi: (ia: IA) => IB): IB
}

declare const invalidFunctor: InvalidFunctor<string>;
const expectError3 = liftedStringLength(invalidFunctor);



declare class InvalidFunctor2<IA2> {
    // does not actually implement Functor because it doesn't return InvalidFunctor2<IB>
    map<IB2>(fi2: (ia2: IA2) => IB2): FunctorX<IB2>

    someUniqueMethod(): IA2
}

declare const invalidFunctor2: InvalidFunctor2<string>;
const expectError4 = liftedStringLength(invalidFunctor2);


//// [higherKindedTypesLift.js]
"use strict";
exports.__esModule = true;
var FunctorX = /** @class */ (function () {
    function FunctorX(elements) {
        this.elements = elements;
    }
    FunctorX.prototype.map = function (f) {
        var mappedElements = this.elements.map(f);
        return new FunctorX(mappedElements);
    };
    FunctorX.prototype.firstVal = function () {
        return this.elements.length ? this.elements[0] : undefined;
    };
    ;
    return FunctorX;
}());
function lift(fToLift) {
    return function (lmap) { return function (lca) { return fToLift(lca, lmap); }; };
}
function staticMap(fa1, fmap1) {
    return fa1.map(fmap1);
}
var liftedFunctor = lift(staticMap);
function stringLength(strarg) {
    return strarg.length;
}
var liftedStringLength = liftedFunctor(stringLength);
var functorXString = new FunctorX(["myFunctorX"]);
var result = liftedStringLength(functorXString);
var expectedType = result;
var expectError = liftedStringLength(result);
// should have error because DiffFunctorY has diffMap function, not "map" as needed because liftedFunctor was created from staticMap which declared Functor
var expectError2 = liftedStringLength(diffFunctorYString);
var expectError3 = liftedStringLength(invalidFunctor);
var expectError4 = liftedStringLength(invalidFunctor2);
