// @strict: false

export class Functor1<A> {
    map<B>(f: (a: A) => B): this<B> {
        return this;
    }
}



interface ValidFunctor<A> {
    map<B>(f: (a: A) => B): this<B>
}

class InvalidImplementor<A> implements ValidFunctor<A> {
    constructor(private elements: A[]) { };

    map<B>(f: (a: A) => B): this<B> { // should declare return type as InvalidImplementor<B> to not be invalid.
        const newElements = this.elements.map(f);
        return new InvalidImplementor(newElements);
    }
}


class ValidImplementor<A> implements ValidFunctor<A> {
    constructor(private elements: A[]) {};

    map<B>(f: (a: A) => B): ValidImplementor<B> { 
        const newElements = this.elements.map(f);
        return new ValidImplementor(newElements);
    }
}


abstract class ValidAbstractFunctor<A> {
    abstract map<B>(f: (a: A) => B): this<B>;
}

class InvalidExtender<A> extends ValidAbstractFunctor<A> {
    constructor(private elements: A[]) { 
        super();
    };

    map<B>(f: (a: A) => B): this<B> { // should declare return type as InvalidImplementor<B> to not be invalid.
        const newElements = this.elements.map(f);
        return new InvalidExtender(newElements);
    }
}


class ValidExtender<A> extends ValidAbstractFunctor<A> {
    constructor(private elements: A[]) {super()};

    map<B>(f: (a: A) => B): ValidExtender<B> { 
        const newElements = this.elements.map(f);
        return new ValidExtender(newElements);
    }
}

// invalid because it must redeclare "map" itself even though its parent implemented it
class InvalidIndirectExtender<A> extends ValidExtender<A> {
    doSomething(): void {
        console.log("");
    }
}




interface GenericThisMustBeInMethod<T> {
    someProp: this<T>
}