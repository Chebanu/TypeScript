function filterArray<T>(array: T[], conditionFunc: (el: T) => boolean): T[] {
  let result = array.filter(function (el) {
    return conditionFunc(el);
  });
  return result;
}

const numbers = [1, 2, 3, 4, 5];
const filteredResult = filterArray(numbers, (num) => num > 3);

class Stack<T> {
  genericValue: T[];

  constructor(genericValue: T[]) {
    this.genericValue = genericValue;
  }

  push(elem: T) {
    this.genericValue.push(elem);
  }

  pop(): T | undefined {
    return this.genericValue.pop();
  }

  peek(): number | undefined {
    return this.genericValue.length > 0
      ? this.genericValue.length - 1
      : undefined;
  }
}

const stack = new Stack<string>(["one", "two", "three"]);

let topIndex = stack.peek();
stack.push("four");
topIndex = stack.peek();

type DictionaryElement<T> = { [n: number | string]: T };

class Dictionary<T> {
  genericValue: DictionaryElement<T>[] = [];

  set(key: number | string, value: T): void {
    const element: DictionaryElement<T> = {};
    element[key] = value;
    this.genericValue.push(element);
  }

  get(key: number | string): T | undefined {
    const element = this.genericValue.find((elem) => key in elem);
    return element ? element[key] : undefined;
  }

  has(key: number | string): boolean {
    return this.genericValue.some((elem) => key in elem);
  }
}

const myDictionary = new Dictionary<number>();

myDictionary.set(1, 42);
myDictionary.set("two", 3);
