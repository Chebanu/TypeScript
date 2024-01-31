interface IExample1 {
  [key: string]: number | string;
}

interface IExample2 {
  [key: string]: (a: number, b: number) => number;
}

interface IExample3 {
  [key: number]: string[];
}

interface IExample4 {
  name: string;
  [key: string]: string | number | boolean;
}

interface IExample5 {
  [key: string]: string;
}

interface IExample6 extends IExample5 {
  name: "Example";
}

interface IExample7 {
  [key: string]: number;
  value: number;
}

const isNumber = (num: IExample7): void => {
  if (typeof num.value === "number") {
    console.log(`It's a number ${num.value}`);
  } else console.log("Not a number");
};
//помню, что нужно нормальные имена придумывать, сорри, xD)
