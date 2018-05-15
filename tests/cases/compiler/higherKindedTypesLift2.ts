// @strict: true

interface StartVal {
    startVal: string
}

interface EndVal {
    endVal: number
}

declare function testFunc(strarg: StartVal): EndVal

export interface FMap<FA, FB> {
    (fmapfa: FA): FB
}

interface Bounded<
    BC<_BCT extends BTBound> extends Bound<BC, _BCT, BTBound>,
    Bound<
        _BC<__BCT>,
        _BT,
        _BTB
    >,
    BT extends BTBound,
    BTBound
> {}

interface Functor<
    CX<_TX extends _TXB, _TXB = {}> extends Functor<CX, _TX, _TXB>,
    AX extends AXBound,
    AXBound
    > 
        extends Bounded<CX, Functor, AX, AXBound> {
    functorMap<BX extends AXBound>(fmapx: FMap<AX, BX>): CX<BX>;
}

interface StaticFunctor<
    SC<_T extends _TB, _TB = {}> extends SCBound<SC, _T, _TB> & Bounded<SC, SCBound, _T, _TB>,
    SCBound<
     _BC<__BCT>,
     _BT,
     _BTB
    >,
    SCTBound = {}
> {
    <AS extends SCTBound, BS extends SCTBound>(fa2: SC<AS>, fmap2: FMap<AS,BS>): SC<BS>
}


declare function lift<
    C<_T extends _TB, _TB = {}> extends ActBound<C, _T, _TB> & Bounded<C, ActBound, _T, _TB>,
    ActBound<
    _BC<__BCT>,
    _BT,
    _BTB
   >,
    ActTBound
>
(fToLift: StaticFunctor<C, ActBound, ActTBound>): LiftedResult<C, ActBound, ActTBound>


interface LiftedResult<
    LC<_LT extends _TB, _TB = {}> extends LRCBound<LC, _LT, _TB> & Bounded<LC, LRCBound, _LT, _TB>,
    LRCBound<
    _BC<__BCT>,
    _BT,
    _BTB
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

declare function staticMap<C1<_T1 extends _T1B, _T1B = {}> extends Functor<C1, _T1, _T1B>, T1Bound, A1 extends T1Bound, B1 extends T1Bound>(fa1: C1<A1>, fmap1: FMap<A1, B1>): C1<B1>;


interface FunctorFoo<AFoo> extends Functor<FunctorFoo, AFoo, {}> {
    functorMap<BFoo>(fmapfoo: FMap<AFoo, BFoo>): FunctorFoo<BFoo>;
    fooVal: AFoo
}

declare const fooObj: FunctorFoo<StartVal>



const liftedStaticMap = lift(staticMap);
const liftedTestFunc = liftedStaticMap(testFunc);
const result = liftedTestFunc(fooObj);
const expectedType: FunctorFoo<EndVal> = result;
const expectError = liftedTestFunc(result)


declare const declaredStaticFunctor: StaticFunctor<Functor, Functor>
const liftedDeclaredStaticFunctor = lift(declaredStaticFunctor);
const liftedDeclaredTestFunc = liftedDeclaredStaticFunctor(testFunc)
const declaredResult = liftedDeclaredTestFunc(fooObj);
const expectedTypeDeclared: FunctorFoo<EndVal> = declaredResult;
const expectErrorDeclared = liftedDeclaredTestFunc(declaredResult)
