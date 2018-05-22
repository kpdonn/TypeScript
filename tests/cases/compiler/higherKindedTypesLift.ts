// @strict: true

export interface Functor<A, Container<_T>> {
    map<B>(f: (a: A) => B): Container<B>;
}

class FunctorX<A> implements Functor<A, FunctorX> {
    constructor(private elements: A[]) {}
    map<B>(f: (a: A) => B): FunctorX<B> {
        const mappedElements = this.elements.map(f);
        return new FunctorX(mappedElements);
    }

    firstVal(): A | undefined {
        return this.elements.length ? this.elements[0] : undefined;
    };
}


interface StaticFunctor<CS<_TS>> {
    <AS, BS>(csas: CS<AS>, fmapstatic: (as: AS) => BS): CS<BS>;
}


interface LiftedResult<LRC<_LT>> {
    <LRA, LRB>(lrmap: (lra: LRA) => LRB): (lrclra: LRC<LRA>) => LC<LRB>
}

function lift<C<_T>>(fToLift: StaticFunctor<C>): LiftedResult<C> {
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

const functorXString = new FunctorX("myFunctorX");

const result = liftedStringLength(functorXString);
const expectedType: FunctorX<number> = result;

const expectError = liftedStringLength(result)

