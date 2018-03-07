// @jsx: react
// @skipLibCheck: true
// @strict: true
// @libFiles: react.d.ts,lib.d.ts

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
