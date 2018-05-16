// @strict: true


export interface Functor<A> {
    map<B>(f: (fa: A) => B): this<B>;
}

class MyArrayFunctor<El> implements Functor<El> {
    constructor(private elements: El[]);

    map<NewEl>(newf: (el: El) => NewEl): MyArrayFunctor<El> {
        const newElements = this.elements.map(newf);
        return new MyArrayFunctor(newElements);
    }

    myMethod(): El {
        return this.elements[0];
    }
}


interface Foo {
    fooProp: string
}

interface Bar {
    barProp: string
}

function fooToBar(fooArg: Foo): Bar {
    return { barProp: fooArg.fooProp };
}


function convertAll<C<_T> extends Functor<_T>, OldT, NewT>(container: C<OldT>, convertFunc: (oldArg: OldT) => NewT): C<NewT> {
    const newContainer = container.map(convertFunc);
    return newContainer;
}