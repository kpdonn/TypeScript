// @jsx: react
// @skipLibCheck: true
// @strict: true
// @libFiles: react.d.ts,lib.d.ts

import * as React from "react";

declare function create<T extends React.ComponentClass<any>>(arg: {
  comp: T;
}): React.ComponentClass<any>;

class MyComponent extends React.Component<any, any> {
  render() {
    return (
      <div>
        <GeneratedComp />
      </div>
    );
  }
}

const GeneratedComp = create({
  comp: MyComponent
});
