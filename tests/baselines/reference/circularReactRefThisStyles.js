//// [circularReactRefThisStyles.tsx]
import * as React from "react";

export type StyleValue = number | string;

export type StyleRule = {
  [key: string]: StyleValue | StyleValue[] | StyleRule;
};

export type StyleDeclaration<TKeys extends string> = {
  [TKey in TKeys]: StyleRule
};

export type ModeDeclarations<TState> = {
  [key: string]: (state: TState) => boolean;
};

export type StyleReducer = (modes: ActiveModes) => CSSClassName;

export type CompiledStyle = CSSClassName | StyleReducer;

export type CompiledStyleSheet<TKeys extends string> = {
  [Key in TKeys]: CompiledStyle
};

export type ActiveModes = { [key: string]: boolean };

export type CSSClassName = string;

export type ComputedStyleSheet<Keys extends string> = {
  [Key in Keys]: CSSClassName
};

declare function compile<TKeys extends string>(
  styles: StyleDeclaration<TKeys>
): CompiledStyleSheet<TKeys>;

declare function reactTo<TProps, TState, TRules extends string>(
  component: React.Component<TProps, TState>,
  styles: CompiledStyleSheet<TRules>,
  modes?: ModeDeclarations<{ props: TProps; state: TState }>
): ComputedStyleSheet<TRules>;

const STYLES = compile({
  root: { padding: 10 }
});

export class App extends React.Component<{}, {}> {
  styles = reactTo(this, STYLES);

  render() {
    return <div className={this.styles.root}> </div>;
  }
}


//// [circularReactRefThisStyles.js]
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
var STYLES = compile({
    root: { padding: 10 }
});
var App = /** @class */ (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.styles = reactTo(_this, STYLES);
        return _this;
    }
    App.prototype.render = function () {
        return React.createElement("div", { className: this.styles.root }, " ");
    };
    return App;
}(React.Component));
exports.App = App;
