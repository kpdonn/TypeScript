// @strict: true

type Example<T extends Record<"a", string>> = T["a"];

type Result1 = Example<{ a: "x" } | { a: "y" }>;
type Result2 = Example<{ a: "x" }>;
type Result3 = Example<never>; 

type NeverNever = never[never];

type ExampleWithString<
  T extends { [i: string]: string },
  S extends string
> = T[S];
type T1 = ExampleWithString<never, "test">;
type TString = ExampleWithString<never, string>;
type TAny = ExampleWithString<never, any>;

type ExampleWithNumber<
  T extends { [i: number]: string },
  N extends number
> = T[N];
type T2 = ExampleWithNumber<never, 10>;
type TNumber = ExampleWithNumber<never, number>;

declare const sym: unique symbol;
type ExampleWithSymbol<T extends { [sym]: string }> = T[typeof sym];
type T3 = ExampleWithSymbol<never>;
