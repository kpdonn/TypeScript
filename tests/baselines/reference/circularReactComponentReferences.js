//// [tests/cases/compiler/circularReactComponentReferences.tsx] ////

//// [mycomp.tsx]
import * as React from "react";
import { GeneratedComp } from "./file1";

export class MyComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <GeneratedComp />
      </div>
    );
  }
}

//// [file1.tsx]
import * as React from "react";
import { MyComponent } from "./mycomp";

declare function create<T extends React.ComponentClass<any>>(arg: {
  comp: T;
}): React.ComponentClass<any>;

export const GeneratedComp = create({
  comp: MyComponent
});


//// [file1.js]
"use strict";
exports.__esModule = true;
var mycomp_1 = require("./mycomp");
exports.GeneratedComp = create({
    comp: mycomp_1.MyComponent
});
//// [mycomp.js]
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
var React = require("react");
var file1_1 = require("./file1");
var MyComponent = /** @class */ (function (_super) {
    __extends(MyComponent, _super);
    function MyComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyComponent.prototype.render = function () {
        return (React.createElement("div", null,
            React.createElement(file1_1.GeneratedComp, null)));
    };
    return MyComponent;
}(React.Component));
exports.MyComponent = MyComponent;
