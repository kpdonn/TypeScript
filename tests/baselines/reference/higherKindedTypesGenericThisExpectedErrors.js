//// [higherKindedTypesGenericThisExpectedErrors.ts]
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

//// [higherKindedTypesGenericThisExpectedErrors.js]
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
var Functor1 = /** @class */ (function () {
    function Functor1() {
    }
    Functor1.prototype.map = function (f) {
        return this;
    };
    return Functor1;
}());
exports.Functor1 = Functor1;
var InvalidImplementor = /** @class */ (function () {
    function InvalidImplementor(elements) {
        this.elements = elements;
    }
    ;
    InvalidImplementor.prototype.map = function (f) {
        var newElements = this.elements.map(f);
        return new InvalidImplementor(newElements);
    };
    return InvalidImplementor;
}());
var ValidImplementor = /** @class */ (function () {
    function ValidImplementor(elements) {
        this.elements = elements;
    }
    ;
    ValidImplementor.prototype.map = function (f) {
        var newElements = this.elements.map(f);
        return new ValidImplementor(newElements);
    };
    return ValidImplementor;
}());
var ValidAbstractFunctor = /** @class */ (function () {
    function ValidAbstractFunctor() {
    }
    return ValidAbstractFunctor;
}());
var InvalidExtender = /** @class */ (function (_super) {
    __extends(InvalidExtender, _super);
    function InvalidExtender(elements) {
        var _this = _super.call(this) || this;
        _this.elements = elements;
        return _this;
    }
    ;
    InvalidExtender.prototype.map = function (f) {
        var newElements = this.elements.map(f);
        return new InvalidExtender(newElements);
    };
    return InvalidExtender;
}(ValidAbstractFunctor));
var ValidExtender = /** @class */ (function (_super) {
    __extends(ValidExtender, _super);
    function ValidExtender(elements) {
        var _this = _super.call(this) || this;
        _this.elements = elements;
        return _this;
    }
    ;
    ValidExtender.prototype.map = function (f) {
        var newElements = this.elements.map(f);
        return new ValidExtender(newElements);
    };
    return ValidExtender;
}(ValidAbstractFunctor));
// invalid because it must redeclare "map" itself even though its parent implemented it
var InvalidIndirectExtender = /** @class */ (function (_super) {
    __extends(InvalidIndirectExtender, _super);
    function InvalidIndirectExtender() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InvalidIndirectExtender.prototype.doSomething = function () {
        console.log("");
    };
    return InvalidIndirectExtender;
}(ValidExtender));
