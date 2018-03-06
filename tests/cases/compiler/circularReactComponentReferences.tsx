// @jsx: react
// @skipLibCheck: true
// @strict: true
// @libFiles: react.d.ts,lib.d.ts

// @Filename: mycomp.tsx
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

// @Filename: file1.tsx

import * as React from "react";
import { MyComponent } from "./mycomp";

declare function create<T extends React.ComponentClass<any>>(arg: {
  comp: T;
}): React.ComponentClass<any>;

export const GeneratedComp = create({
  comp: MyComponent
});
