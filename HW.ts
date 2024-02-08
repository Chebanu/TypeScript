type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends T[K] ? DeepRequireReadonly<T[K]> : T[K];
};

type Type1 = {
  name: string;
  info: {
    age: number;
    address: {
      city: string;
      postalCode: string;
    };
  };
};

type ReadonlyExample = DeepReadonly<Type1>;

const readonlyObj: ReadonlyExample = {
  name: "Jack",
  info: {
    age: 25,
    address: {
      city: "London",
      postalCode: "12345",
    },
  },
};

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: T[K] extends T[K]
    ? DeepRequireReadonly<T[K]>
    : T[K];
};

type Type2 = {
  name: string;
  info?: {
    age?: number;
    address?: {
      city: string;
    };
  };
};

type Example2 = DeepRequireReadonly<Type2>;

type Example22 = Type2;

const Obj2: Example22 = {
  name: "Obj",
  info: {},
};

const Object2: Example2 = {
  name: "John",
  info: {
    age: 25,
    address: {
      city: "Example City",
    },
  },
};

type UpperCaseKeys<T> = {
  [K in keyof T as Uppercase<string & K>]: T[K];
};

type Type3 = {
  name: string;
  age: number;
};

type Example3 = UpperCaseKeys<Type3>;
let a: Example3;

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: PropertyDescriptor;
};

type Type4 = {
  name: string;
  age: number;
};

const Example4: Type4 = {
  name: "Alexei",
  age: 20,
};

const Updated: ObjectToPropertyDescriptor<Type4> = {
  name: {},
  age: {},
};
