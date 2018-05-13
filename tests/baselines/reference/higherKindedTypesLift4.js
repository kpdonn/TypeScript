//// [higherKindedTypesLift4.ts]
export interface FMap<FA, FB> {
    (fmapfa: FA): FB
}

interface Bounded<
    BC<_BCT> extends Bound<BC, _BCT>,
    Bound<
        _BC<__BCT>,
        _BT
    >,
    BT extends BTBound,
    BTBound = BT
> {}

interface Functor<CX<_TX extends AXBound> extends Functor<CX, AX, AXBound>, AX extends AXBound, AXBound = AX> extends Bounded<CX, Functor, AX, AXBound> {
    map<BX extends AXBound>(fmapx: (fmapxax: AX) => BX): CX<BX>;
}

interface FunctorFoo<AFoo> extends Functor<FunctorFoo, AFoo> {
    map<BFoo>(fmapfoo: FMap<AFoo, BFoo>): FunctorFoo<BFoo>;
    fooVal: AFoo
}

interface StaticFunctor<
    SC<_T extends SCTBound> extends SCBound<SC, _T> & Bounded<SC, SCBound, _T, SCTBound>,
    SCBound<
     _BC<__BCT>,
     _BT
    >,
    SCTBound = {}
> {
    <AS extends SCTBound, BS extends SCTBound>(fa2: SC<AS>, fmap2: FMap<AS,BS>): SC<BS>
}


declare function staticMap<C1<_T1 extends T1Bound> extends Functor<C1, T1Bound, T1Bound>, T1Bound, A1 extends T1Bound, B1 extends T1Bound>(fa1: C1<A1>, fmap1: FMap<A1, B1>): C1<B1>;


interface LiftedResult<
    LC<_LT extends LRTBound> extends LRCBound<LC, _LT> & Bounded<LC, LRCBound, _LT, LRTBound>,
    LRCBound<
    _BC<__BCT>,
    _BT
   >,
   LRTBound 
> {
    <LA, LB>(lmap: FMap<LA,LB>): LiftedResult2<LC, LA, LB, LRCBound>
}

interface LiftedResult2<
    LC2<_LT extends LA2 | LB2> extends LRC2Bound<LC2, _LT,  LA2 | LB2> & Bounded<LC2, LRC2Bound, _LT, LA2 | LB2>, 
    LA2,
    LB2,
    LRC2Bound<
        _BC<__BCT>,
        _BT,
        _BTB
    >,
> {
    <FinalC<_FT extends LA2 | LB2> extends LC2<_FT>>(lc2la2: FinalC<LA2>): FinalC<LB2>
}

declare function lift<
    C<_T extends ActTBound> extends ActBound & Bounded<C, ActBound, _T, ActTBound>,
    ActBound,
    ActTBound
>
(fToLift: StaticFunctor<C, ActBound, ActTBound>): LiftedResult<C, ActBound, ActTBound>

interface StartVal {
    startVal: string
}

interface EndVal {
    endVal: number
}


declare const fooObj: FunctorFoo<StartVal>
declare function stringLength(strarg: StartVal): EndVal

const liftedStaticMap = lift(staticMap);
const liftedStringLength = liftedStaticMap(stringLength);
const result = liftedStringLength(fooObj);
const expectedType: FunctorFoo<EndVal> = result;
const expectError = liftedStringLength(result)


declare const declaredStaticFunctor: StaticFunctor<Functor, Functor>
const liftedDeclaredStaticFunctor = lift(declaredStaticFunctor);
const liftedDeclaredStringLength = liftedDeclaredStaticFunctor(stringLength)
const declaredResult = liftedDeclaredStringLength(fooObj);
const expectedTypeDeclared: FunctorFoo<EndVal> = declaredResult;
const expectErrorDeclared = liftedDeclaredStringLength(declaredResult)


//// [higherKindedTypesLift4.js]
"use strict";
exports.__esModule = true;
var liftedStaticMap = lift(staticMap);
var liftedStringLength = liftedStaticMap(stringLength);
var result = liftedStringLength(fooObj);
var expectedType = result;
var expectError = liftedStringLength(result);
var liftedDeclaredStaticFunctor = lift(declaredStaticFunctor);
var liftedDeclaredStringLength = liftedDeclaredStaticFunctor(stringLength);
var declaredResult = liftedDeclaredStringLength(fooObj);
var expectedTypeDeclared = declaredResult;
var expectErrorDeclared = liftedDeclaredStringLength(declaredResult);
